import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Form from "../components/UI/Form";
import Modal from "../components/UI/Modal";
import useHttp from "../hooks/use-http";
import {
  fetchSingleWorkshopFS,
  insertExamFS,
  updateWorkshop,
} from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Button from "../components/UI/Button";
import { FaPlus } from "react-icons/fa";
import Input from "../components/UI/Input";
import { useDispatch } from "react-redux";
import { snackbarActions } from "../store/snackbar/snackbar-slice";
// import firebase from "../lib/db";

const AddExam = (props) => {
  const formRef = useRef();

  const firstAnswerRef = useRef();

  const secondAnswerRef = useRef();

  const thirdAnswerRef = useRef();

  const dispatch = useDispatch();

  const [currentQuestion, setCurrentQuestion] = useState(1);

  const [questions, setQuestions] = useState([currentQuestion]);

  const [questionAnswers, setQuestionAnswers] = useState([]);

  let answer = {};

  const params = useParams();

  const { workshopId } = params;

  const {
    isLoading,
    sendHttpRequest: fetchSingleWorkshop,
    data: singleWorkshop,
  } = useHttp(fetchSingleWorkshopFS);

  const { isLoading: examLoading, sendHttpRequest: insertExamRequest } =
    useHttp(insertExamFS);

  const { sendHttpRequest: updateWorkshopRequest } = useHttp(updateWorkshop);

  useEffect(() => {
    fetchSingleWorkshop(workshopId);
  }, [workshopId, fetchSingleWorkshop]);

  const firstAnswerChangeHandler = (e) => {
    if (firstAnswerRef?.current?.value) {
      answer["answerA"] = e.target.value;
    }
    if (secondAnswerRef?.current?.value && thirdAnswerRef?.current?.value) {
      setQuestionAnswers((state) => state.concat(answer));
    }
  };
  const secondAnswerChangeHandler = (e) => {
    if (secondAnswerRef?.current?.value) {
      answer["answerB"] = e.target.value;
    }
    if (firstAnswerRef?.current?.value && thirdAnswerRef?.current?.value) {
      setQuestionAnswers((state) => state.concat(answer));
    }
  };
  const thirdAnswerChangeHandler = (e) => {
    if (thirdAnswerRef?.current?.value) {
      answer["answerC"] = e.target.value;
    }
    if (firstAnswerRef?.current?.value && secondAnswerRef?.current?.value) {
      setQuestionAnswers((state) => state.concat(answer));
    }
  };

  const addNewQuestionHandler = () => {
    if (!questionAnswers[currentQuestion - 1]) {
      dispatch(
        snackbarActions.showSnackBar({
          type: "error",
          message: "Please fill all question fields",
        })
      );
      return;
    }
    setCurrentQuestion((state) => state + 1);
    setQuestions((state) => {
      return state.concat(currentQuestion + 1);
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const formData = [...new FormData(formRef.current)];

    const questionsPrefix = [
      ...new Set(formData.map((data) => data[0].slice(0, 2))),
    ];

    const examData = questionsPrefix.map((qp) => {
      const questionObject = Object.fromEntries(
        formData.filter((q) => q[0].startsWith(qp))
      );

      let transformedQuestionObject = {};

      for (let key in questionObject) {
        const keyWithoutPrefix = key.slice(3);

        transformedQuestionObject[keyWithoutPrefix] = questionObject[key];
      }

      return transformedQuestionObject;
    });

    insertExamRequest({ exam: examData, workshopId })
      .then((_) =>
        updateWorkshopRequest({
          collection: "workshops",
          workshopId,
          data: {
            hasExam: true,
          },
        })
      )
      .then((_) => {
        dispatch(
          snackbarActions.showSnackBar({
            type: "success",
            message: "Exam Added Successfully",
          })
        );
        props.onHide();
        props.examAdded();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal onHide={props.onHide}>
      <Form onSubmit={formSubmitHandler} ref={formRef}>
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <h2 className="form-title">
            Add Exam To{" "}
            <span className="form-title--span">{singleWorkshop.name} </span>
            Workshop
          </h2>
        )}
        <div className="form-grid">
          {/* Question */}
          {questions.map((q, questionIndex) => {
            return (
              <div key={q} className="form-control">
                <Input
                  input={{
                    type: "text",
                    name: `q${q}-question`,
                    id: `q${q}-question`,
                    required: true,
                  }}
                  label={`Question ${q}`}
                />
                <Input
                  input={{ type: "text", name: `q${q}-image`, id: "image" }}
                  label="Question Image [OPTIONAL]"
                />
                <Input
                  input={{
                    type: "text",
                    name: `q${q}-answerA`,
                    id: "answer1",
                    onBlur: firstAnswerChangeHandler,
                    required: true,
                  }}
                  label="Answer 1 [A]"
                  ref={firstAnswerRef}
                />
                <Input
                  input={{
                    type: "text",
                    name: `q${q}-answerB`,
                    id: "answer2",
                    onBlur: secondAnswerChangeHandler,
                    required: true,
                  }}
                  label="Answer 2 [B]"
                  ref={secondAnswerRef}
                />
                <Input
                  input={{
                    type: "text",
                    name: `q${q}-answerC`,
                    id: "answer3",
                    onBlur: thirdAnswerChangeHandler,
                    required: true,
                  }}
                  label="Answer 3 [C]"
                  ref={thirdAnswerRef}
                />
                <label>Right Answer</label>
                <select name={`q${q}-rightAnswer`}>
                  <option>{questionAnswers[questionIndex]?.answerA}</option>
                  <option>{questionAnswers[questionIndex]?.answerB}</option>
                  <option>{questionAnswers[questionIndex]?.answerC}</option>
                </select>
              </div>
            );
          })}
          {/* Question */}
        </div>
        <div className="form-controls">
          <div className="form-extra-info">
            <h4 className="form-sub-title">Questions: {currentQuestion}</h4>
            <Button
              type="button"
              icon={<FaPlus />}
              text="Add New Question"
              onClick={addNewQuestionHandler}
            />
          </div>
          <button
            type="submit"
            className="form-submit"
            id="add-new-profile"
            disabled={examLoading}
          >
            {examLoading && "Adding"}
            {!examLoading && "Add"}
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddExam;
