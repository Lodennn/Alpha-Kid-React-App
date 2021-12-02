import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import useHttp from "../hooks/use-http";
import { fetchDataFS } from "../lib/api";
import Modal from "../components/UI/Modal";
import classes from "./ExamSheet.module.scss";
import images from "../assets/";

const ExamSheet = (props) => {
  const {
    data: fetchedExamSheet,
    isLoading: examSheetLoading,
    sendHttpRequest: fetchExamSheetRequest,
  } = useHttp(fetchDataFS);

  const params = useParams();

  const { workshopId } = params;

  const {
    activeUserProfile: { id: profileId },
  } = useSelector((state) => state.profile);

  const { user } = useSelector((state) => state.user);

  if (fetchedExamSheet[0]) {
    var { examSheet, kidName, passStatus, result, workshopName } =
      fetchedExamSheet[0];
  }

  useEffect(() => {
    fetchExamSheetRequest({
      collection: "examSheets",
      queries: [
        { where: "profileId", condition: "==", value: profileId },
        { where: "workshopId", condition: "==", value: workshopId },
      ],
    });
  }, [fetchExamSheetRequest, profileId, workshopId]);

  return (
    <Modal onHide={props.onHide}>
      <div className={classes.sheet}>
        <img
          src={
            images.examSheet[`${passStatus ? "passedEmoji" : "failedEmoji"}`]
          }
          alt="Emoji"
          className={classes["sheet__emoji"]}
        />
        <h2
          className={`${classes["sheet__title"]} ${classes["sheet__title--primary"]}`}
        >
          Exam Summary
        </h2>
        <p className={classes["sheet__paragraph"]}>
          Hello{" "}
          <span
            className={`${classes["sheet__span"]} ${classes["sheet__span--primary"]}`}
          >
            {user.name}
          </span>
          , {passStatus ? "Congratulations" : "Unfortunately"} Your kid{" "}
          <span
            className={`${classes["sheet__span"]} ${classes["sheet__span--primary"]}`}
          >
            {kidName}
          </span>{" "}
          has {passStatus ? "passed" : "failed"} the{" "}
          <span
            className={`${classes["sheet__span"]} ${classes["sheet__span--primary"]}`}
          >
            {workshopName}
          </span>{" "}
          workshop exam
        </p>
        <h2
          className={`${classes["sheet__title"]} ${classes["sheet__title--secondary"]} mt-md`}
        >
          Exam Review
        </h2>
        <ul className={`${classes["sheet__review"]} mt-sm`}>
          {!examSheetLoading &&
            !!examSheet &&
            examSheet.length > 0 &&
            examSheet.map((sheet, index) => {
              const { rightAnswer, kidAnswer, question, isAnswerRight } = sheet;
              return (
                <li key={index}>
                  <h2
                    className={`${classes["sheet__review--question"]} mt-sm mb-xs`}
                  >
                    Q{index + 1}: {question} ?
                  </h2>
                  <h3 className={`${classes["sheet__review--kid-answer"]}`}>
                    <span className="span--strong">{kidName}'s answer:</span>{" "}
                    {kidAnswer}
                  </h3>
                  <h3
                    className={`${classes["sheet__review--right-answer"]} mb-xs`}
                  >
                    <span className="span--strong">The right answer:</span>{" "}
                    {rightAnswer}
                  </h3>
                  <h5
                    className={` ${classes["sheet__review--status"]} ${
                      classes[
                        `sheet__review--status-${
                          isAnswerRight ? "right" : "wrong"
                        }`
                      ]
                    }`}
                  >
                    {isAnswerRight ? "Right Answer 😁" : "Wrong Answer 😥"}
                  </h5>
                </li>
              );
            })}
        </ul>
        <h3 className={classes["sheet__grade"]}>
          Grade {result}{" "}
          {passStatus && (
            <span
              className={`${classes["sheet__span"]} ${classes["sheet__span--success"]} span--strong`}
            >
              Passed
            </span>
          )}
          {!passStatus && (
            <span
              className={`${classes["sheet__span"]} ${classes["sheet__span--failed"]} span--strong`}
            >
              Failed
            </span>
          )}
        </h3>
      </div>
    </Modal>
  );
};

export default ExamSheet;
