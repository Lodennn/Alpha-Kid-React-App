import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import useHttp from "../../hooks/use-http";
import { fetchDocFS, fetchDataFS } from "../../lib/api";
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
  } = useHttp(fetchDocFS);

  const { data: examSheet, sendHttpRequest: fetchExamSheetRequest } =
    useHttp(fetchDataFS);

  const { activeUserProfile } = useSelector((state) => state.profile);

  const { id: profileId } = activeUserProfile;

  const examHasBeenTaken =
    examSheet[0]?.profileId === profileId &&
    examSheet[0]?.workshopId === workshopId;

  useEffect(() => {
    fetchSingleWorkshop({ collection: "workshops", id: workshopId });
    fetchExamSheetRequest({
      collection: "examSheets",
      queries: [
        { where: "profileId", condition: "==", value: profileId },
        { where: "workshopId", condition: "==", value: workshopId },
      ],
    });
  }, [workshopId, fetchSingleWorkshop, profileId, fetchExamSheetRequest]);

  const { lessons } = workshop;

  const [activeLesson, setActiveLesson] = useState({ lesson: "" });

  const [isExamAvailable, setIsExamAvailable] = useState(false);

  const [watchedLessons, setWatchedLessons] = useState(lessons);

  const [videoId, setVideoId] = useState("");

  const getActiveLessonHandler = (lesson) => {
    setActiveLesson(lesson);
    if (lesson.lesson) {
      setVideoId(lesson.lesson.split("/").at(-1));
    }
  };

  const checkIsExamAvailable = (availability) => {
    setIsExamAvailable(availability);
  };

  const getExamDoneStatus = (isExamDone) => {
    setExamDone(isExamDone);
  };

  const getWatchedLessonsHandler = (watchedLessons) => {
    setWatchedLessons(watchedLessons);
  };

  return (
    <Fragment>
      <MainLayoutWrapper>
        {isLoading && <LoadingSpinner />}
        {!isLoading && watchedLessons && watchedLessons.length > 0 && (
          <Lessons
            lessons={watchedLessons}
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
            videoId={videoId}
            getWatchedLessons={getWatchedLessonsHandler}
          />
        )}
      </MainLayoutWrapper>
    </Fragment>
  );
};

export default SingleWorkshopContent;
