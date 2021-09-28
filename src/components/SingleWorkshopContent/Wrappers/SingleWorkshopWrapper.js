import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useHttp from "../../../hooks/use-http";
import { fetchExamFS, updateWorkshop } from "../../../lib/api";
import Wrapper from "../../UI/Wrapper";
import Exam from "../Exam/Exam";
import classes from "./SingleWorkshopWrapper.module.scss";
import YouTube from "react-youtube";

const SingleWorkshopWrapper = (props) => {
  const { workshop, isExamAvailable, getWatchedLessons } = props;

  const params = useParams();

  const { workshopId } = params;

  const { sendHttpRequest: fetchExamRequest, data: exam } =
    useHttp(fetchExamFS);

  const { sendHttpRequest: updateWorkshopRequest } = useHttp(updateWorkshop);

  const [watchedLessons, setWatchedLessons] = useState(workshop.lessons);

  const updatedLessonsAsWatched = (lesson) => {
    setWatchedLessons((state) => {
      const updatedLessonIndex = state.findIndex(
        (watchedLesson) => watchedLesson.lesson === lesson.lesson
      );
      const lessonWatched = { ...lesson, watched: true };
      const updatedWatchedLessons = [...state];
      updatedWatchedLessons[updatedLessonIndex] = lessonWatched;
      return updatedWatchedLessons;
    });
  };

  useEffect(() => {
    // updateWorkshopRequest({
    //   collection: "workshops",
    //   workshopId,
    //   data: { lessons: watchedLessons },
    // });
    getWatchedLessons(watchedLessons);
  }, [
    updateWorkshopRequest,
    watchedLessons,
    workshopId,
    isExamAvailable,
    getWatchedLessons,
  ]);

  const opts = {
    width: "100%",
    height: "100%",
    title: "YouTube video player",
    frameBorder: "0",
    allow:
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  // when video ends
  const onPlayerStateChange = (event) => {
    if (event.data === 0) {
      updatedLessonsAsWatched(props.activeLesson);
    }
  };

  useEffect(() => {
    fetchExamRequest(workshopId);
  }, [fetchExamRequest, workshopId]);

  return (
    <Wrapper
      className={`${classes["single-workshop-wrapper"]}`}
      container="container"
    >
      <h2 className="section-title">{workshop.name}</h2>
      {!props.isExamAvailable && (
        <div className="youtube-wrapper">
          <YouTube
            videoId={props.videoId}
            opts={opts}
            onReady={onReady}
            onStateChange={onPlayerStateChange}
          />
        </div>
      )}
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
