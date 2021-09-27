import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import useHttp from "../../../hooks/use-http";
import { fetchExamFS } from "../../../lib/api";
import Wrapper from "../../UI/Wrapper";
import Exam from "../Exam/Exam";
import classes from "./SingleWorkshopWrapper.module.scss";

const SingleWorkshopWrapper = (props) => {
  const workshop = props.workshop;

  const params = useParams();

  const { workshopId } = params;

  // const exam = [...Object.values(workshop.exam)][0];
  const { sendHttpRequest: fetchExamRequest, data: exam } =
    useHttp(fetchExamFS);

  useEffect(() => {
    fetchExamRequest(workshopId);
  }, [fetchExamRequest, workshopId]);

  return (
    <Wrapper
      className={`${classes["single-workshop-wrapper"]}`}
      container="container"
    >
      <h2 className="section-title">{workshop.name}</h2>
      {/* {!props.isExamAvailable && ( */}
      {!props.isExamAvailable && (
        <iframe
          width="100%"
          height="100%"
          src={props.activeLesson.lesson}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
      {/* {props.isExamAvailable && exam.length && ( */}
      {props.isExamAvailable && exam.length && (
        <Exam
          exam={exam}
          workshop={workshop}
          onExamDone={props.onExamDone}
          isExamDone={props.isExamDone}
          examHasBeenTaken={props.examHasBeenTaken}
        />
      )}
    </Wrapper>
  );
};

export default SingleWorkshopWrapper;
