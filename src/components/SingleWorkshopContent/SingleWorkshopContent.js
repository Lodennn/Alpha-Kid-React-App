import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import useHttp from "../../hooks/use-http";
import { fetchSingleWorkshopFS, fetchExamSheet } from "../../lib/api";
import MainLayoutWrapper from "../Layout/MainLayoutWrapper";
import Lessons from "./Lessons/Lessons";
import LoadingSpinner from "../UI/LoadingSpinner";
import SingleWorkshopWrapper from "./Wrappers/SingleWorkshopWrapper";
import { useSelector } from "react-redux";

const SingleWorkshopContent = () => {
  const params = useParams();

  const [examDone, setExamDone] = useState(false);

  const { workshopId } = params;

  const {
    isLoading,
    data: workshop,
    sendHttpRequest: fetchSingleWorkshop,
  } = useHttp(fetchSingleWorkshopFS);

  const { data: examSheet, sendHttpRequest: fetchExamSheetRequest } =
    useHttp(fetchExamSheet);

  const { activeUserProfile } = useSelector((state) => state.profile);

  const { id: kidProfileId } = activeUserProfile;

  console.log("workshopId: ", workshopId, "kidId: ", kidProfileId);

  const examHasBeenTaken =
    examSheet.kidProfileId === kidProfileId &&
    examSheet.workshopId === workshopId;

  useEffect(() => {
    fetchSingleWorkshop(workshopId);
    fetchExamSheetRequest({ kidProfileId, workshopId });
  }, [workshopId, fetchSingleWorkshop, kidProfileId, fetchExamSheetRequest]);

  const { lessons } = workshop;

  const [activeLesson, setActiveLesson] = useState({});
  const [isExamAvailable, setIsExamAvailable] = useState(false);

  const getActiveLessonHandler = (lesson) => {
    setActiveLesson(lesson);
  };

  const checkIsExamAvailable = (availability) => {
    setIsExamAvailable(availability);
  };

  const getExamDoneStatus = (isExamDone) => {
    setExamDone(isExamDone);
  };

  return (
    <Fragment>
      <MainLayoutWrapper>
        {isLoading && <LoadingSpinner />}
        {!isLoading && lessons && lessons.length > 0 && (
          <Lessons
            lessons={lessons}
            getActiveLesson={getActiveLessonHandler}
            getExam={checkIsExamAvailable}
            isExamDone={examDone}
            examHasBeenTaken={examHasBeenTaken}
          />
        )}
        {isLoading && <LoadingSpinner />}
        {!isLoading && workshop.name && (
          <SingleWorkshopWrapper
            workshop={workshop}
            activeLesson={activeLesson}
            isExamAvailable={isExamAvailable}
            onExamDone={getExamDoneStatus}
            isExamDone={examDone}
            examHasBeenTaken={examHasBeenTaken}
          />
        )}
      </MainLayoutWrapper>
    </Fragment>
  );
};

export default SingleWorkshopContent;
