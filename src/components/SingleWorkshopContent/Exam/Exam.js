import React, { useReducer } from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../../hooks/use-http";
import {
  fetchSingleWorkshopFS,
  insertExamSheet,
  insertDoneWorkshops,
} from "../../../lib/api";
import { snackbarActions } from "../../../store/snackbar/snackbar-slice";
import classes from "./Exam.module.scss";

const Exam = (props) => {
  const { sendHttpRequest: insertExamSheetRequest } = useHttp(insertExamSheet);

  //prettier-ignore
  const { sendHttpRequest: getSingleWorkshopRequest } = useHttp(fetchSingleWorkshopFS);

  const { sendHttpRequest: insertDoneWorkshopRequest } =
    useHttp(insertDoneWorkshops);

  const { activeUserProfile } = useSelector((state) => state.profile);

  const { exam, workshop, isExamDone, examHasBeenTaken } = props;

  const numberOfQuestions = exam.length;

  const examPassingScore = numberOfQuestions <= 2 ? 50 : 75;

  const reduxDispatch = useDispatch();

  const initialState = {
    activeQuestionIndex: 0,
    examSheet: [],
  };

  // REDUCER FUNCTIOn
  const examReducer = (state = initialState, action) => {
    if (action.type === "GET_ANSWER") {
      const existingQuestionIndex = state.examSheet.findIndex(
        (question) => question.question === action.value.question
      );
      const existingQuestion = state.examSheet[existingQuestionIndex];
      const updatedExamSheet = state.examSheet;

      if (existingQuestion) {
        const updatedQuestion = action.value;
        updatedExamSheet[existingQuestionIndex] = updatedQuestion;
      } else {
        updatedExamSheet.push(action.value);
      }
      return { ...state, examSheet: updatedExamSheet };
    }
    if (action.type === "NEXT") {
      if (state.activeQuestionIndex >= action.maxQuestions) {
        return { ...state, activeQuestionIndex: action.maxQuestions };
      }
      // state.activeQuestionIndex = state.activeQuestionIndex + 1;
      // return { ...state, activeQuestionIndex: state.activeQuestionIndex };
      return {
        ...state,
        activeQuestionIndex: state["activeQuestionIndex"] + 1,
      };
    }
    return state;
  };
  const [examState, dispatch] = useReducer(examReducer, initialState);

  const getAnswerHandler = (examData, e) => {
    const isAnswerRight = examData.rightAnswer === e.target.value;

    dispatch({
      type: "GET_ANSWER",
      value: {
        question: examData.question,
        rightAnswer: examData.rightAnswer,
        kidAnswer: e.target.value,
        isAnswerRight,
      },
    });
  };

  const nextQuestionHandler = () => {
    dispatch({ type: "NEXT", maxQuestions: numberOfQuestions - 1 });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const { examSheet } = examState;

    const examResult = examSheet.reduce((acc, cur) => {
      if (cur.isAnswerRight) {
        return ++acc;
      }
      return acc;
    }, 0);

    const kidSuccessStatus =
      (examResult / numberOfQuestions) * 100 >= examPassingScore;

    const fullExamSheet = {
      examSheet,
      kidName: activeUserProfile.name,
      workshopName: workshop.name,
      result: `${examResult} of ${numberOfQuestions}`,
      passStatus: kidSuccessStatus ? true : false,
      profileId: activeUserProfile.id,
      workshopId: workshop.id,
    };

    getSingleWorkshopRequest(workshop.id);

    insertExamSheetRequest(fullExamSheet)
      .then((examSheetData) => {
        insertDoneWorkshopRequest({
          data: { examSheetId: examSheetData.id, ...workshop },
          profileId: activeUserProfile.id,
        });
        // .then((data) =>
        //   updateWorkshopRequest({
        //     collection: "doneWorkshops",
        //     workshopId: data.id,
        //     data: { examSheetId: examSheetData.id },
        //   })
        // );
      })
      .then((_) =>
        reduxDispatch(
          snackbarActions.showSnackBar({
            type: "success",
            message: "Exam Sheet has sent to parent",
          })
        )
      );

    props.onExamDone(true);
  };

  return (
    <form onSubmit={submitFormHandler}>
      <div className={classes.exam}>
        {!isExamDone &&
          !examHasBeenTaken &&
          exam.map((examData, index) => {
            const { question, answerA, answerB, answerC } = examData;

            return (
              <div
                key={examData.question}
                className={`${classes["exam__slide"]} ${
                  examState.activeQuestionIndex === index
                    ? classes["exam__slide--active"]
                    : null
                }`}
              >
                <div className={classes["exam__info"]}>
                  <h3 className={classes["exam__info--question"]}>
                    {examState.activeQuestionIndex + 1}: {question} ?
                  </h3>
                  <h5 className={classes["exam__info--progress"]}>
                    Question: {examState.activeQuestionIndex + 1} of{" "}
                    {numberOfQuestions}
                  </h5>
                </div>
                <div className={classes["exam__wrapper"]}>
                  <div className={classes["exam__answer"]}>
                    <input
                      type="radio"
                      name={`choosenAnswer${index}`}
                      value={answerA}
                      onChange={getAnswerHandler.bind(null, examData)}
                      className={classes["exam__answer--value"]}
                    />{" "}
                    <span className={classes["exam__answer--label"]}>
                      A: {answerA}
                    </span>
                  </div>
                  <div className={classes["exam__answer"]}>
                    <input
                      type="radio"
                      name={`choosenAnswer${index}`}
                      value={answerB}
                      onChange={getAnswerHandler.bind(null, examData)}
                      className={classes["exam__answer--value"]}
                    />{" "}
                    <span className={classes["exam__answer--label"]}>
                      B: {answerB}
                    </span>
                  </div>
                  <div className={classes["exam__answer"]}>
                    <input
                      type="radio"
                      name={`choosenAnswer${index}`}
                      value={answerC}
                      onChange={getAnswerHandler.bind(null, examData)}
                      className={classes["exam__answer--value"]}
                    />{" "}
                    <span className={classes["exam__answer--label"]}>
                      C: {answerC}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        {!isExamDone &&
          !examHasBeenTaken &&
          examState.activeQuestionIndex !== numberOfQuestions - 1 && (
            <button
              type="button"
              onClick={nextQuestionHandler}
              className={`${classes["exam__btn"]}`}
            >
              <span>Next Question</span> {<FaChevronCircleRight />}
            </button>
          )}
        {!isExamDone &&
          !examHasBeenTaken &&
          examState.activeQuestionIndex === numberOfQuestions - 1 && (
            <button type="submit" className={`${classes["exam__btn"]}`}>
              <span>Submit Exam 😊</span>
            </button>
          )}
        {(isExamDone || examHasBeenTaken) && (
          <h3 className={classes["exam__info--question"]}>
            Thanks for taking{" "}
            <span className="color--secondary">{workshop.name}</span> exam 😀
          </h3>
        )}
      </div>
    </form>
  );
};

export default Exam;
