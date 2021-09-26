import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import useHttp from "../hooks/use-http";
import { fetchExamSheet } from "../lib/api";
import Modal from "../components/UI/Modal";

const ExamSheet = (props) => {
  const {
    data: fetchedExamSheet,
    isLoading: examSheetLoading,
    sendHttpRequest: fetchExamSheetRequest,
  } = useHttp(fetchExamSheet);

  const params = useParams();

  const { workshopId } = params;

  const {
    activeUserProfile: { id: profileId },
  } = useSelector((state) => state.profile);

  const { user } = useSelector((state) => state.user);

  const { examSheet, kidName, passStatus, result, workshopName } =
    fetchedExamSheet;

  console.log("examSheet: ", fetchedExamSheet.examSheet);

  useEffect(() => {
    fetchExamSheetRequest({ profileId, workshopId });
  }, [fetchExamSheetRequest, profileId, workshopId]);

  return (
    <Modal onHide={props.onHide}>
      <div>
        <h2>Hello Mr.{user.name}</h2>
        <h4>
          Your kid {kidName} has take exam of {workshopName} workshop
        </h4>
        <h4>
          {passStatus ? "Congratulations " : "unfortunately"} {kidName} has{" "}
          {passStatus ? "Passed 😍" : "Failed 😥"} the exam
        </h4>
        <h4>Exam Result: {result}</h4>
        <ul className="mt-sm">
          {!examSheetLoading &&
            !!examSheet &&
            examSheet.length > 0 &&
            examSheet.map((sheet, index) => {
              const { rightAnswer, kidAnswer, question, isAnswerRight } = sheet;
              return (
                <>
                  <li key={index}>
                    <h2>{question}</h2>
                    <h3>The right answer - {rightAnswer}</h3>
                    <h3>yout kid answer - {kidAnswer}</h3>
                    <h5>
                      Status: {isAnswerRight ? "Right Answer" : "Wrong Answer"}
                    </h5>
                  </li>
                  <hr />
                </>
              );
            })}
        </ul>
      </div>
    </Modal>
  );
};

export default ExamSheet;
