import { useEffect, useState } from "react";
import { FaCheck, FaLock } from "react-icons/fa";
import classes from "./Lessons.module.scss";

const Lessons = (props) => {
  const [watchedLessons, setWatchedLessons] = useState(props.lessons);
  const [activeLesson, setActiveLesson] = useState(props.lessons[0]);
  const [availableExam, setAvailableExam] = useState(false);
  const [startExam, setStartExam] = useState(false);

  watchedLessons[0].watched = true;

  const { getActiveLesson, getExam, isExamDone, examHasBeenTaken } = props;

  useEffect(() => {
    getActiveLesson(activeLesson);
    setAvailableExam(watchedLessons.every((lesson) => lesson.watched));
    getExam(startExam);
  }, [getActiveLesson, activeLesson, getExam, startExam, watchedLessons]);

  const setActiveWatchedLesson = (lesson) => {
    setWatchedLessons((state) => {
      const updatedLessonIndex = state.findIndex(
        (watchedLesson) => watchedLesson.lesson === lesson.lesson
      );
      const lessonWatched = { ...lesson, watched: true };
      const updatedWatchedLessons = [...state];
      updatedWatchedLessons[updatedLessonIndex] = lessonWatched;
      return updatedWatchedLessons;
    });
    setActiveLesson(lesson);
    setStartExam(false);
  };

  const startExamHandler = () => {
    if (availableExam || examHasBeenTaken) {
      setStartExam(true);
      setActiveLesson({});
    }
  };

  return (
    <div className={`${classes.lessons}`}>
      <div className={`${classes.container} container`}>
        <ul className={`${classes["lessons__list"]} list-unstyled`}>
          {watchedLessons.map((lesson, index) => {
            return (
              <li
                key={index}
                className={`${classes["lessons__lesson"]} ${
                  lesson.watched || examHasBeenTaken
                    ? classes["lessons__lesson--active"]
                    : null
                } ${
                  lesson.lesson === activeLesson.lesson
                    ? classes["lessons__lesson--watched"]
                    : null
                }`}
                onClick={setActiveWatchedLesson.bind(null, lesson)}
              >
                {(lesson.watched || examHasBeenTaken) && (
                  <span
                    className={`${classes["lessons__lesson--status"]} ${classes["lessons__lesson--status-active"]}`}
                  >
                    <FaCheck />
                  </span>
                )}
                <span className={classes["lessons__lesson--no"]}>
                  Lesson {index + 1}
                </span>
              </li>
            );
          })}
          {/* Exam Link */}
          <li
            className={`${classes["lessons__lesson"]} ${
              startExam && !!!activeLesson.lesson
                ? classes["lessons__lesson--watched"]
                : null
            } ${
              isExamDone || examHasBeenTaken
                ? classes["lessons__lesson--active"]
                : null
            }`}
            onClick={startExamHandler}
          >
            {(isExamDone || examHasBeenTaken) && (
              <span
                className={`${classes["lessons__lesson--status"]} ${classes["lessons__lesson--status-active"]}`}
              >
                <FaCheck />
              </span>
            )}
            <span className={classes["lessons__lesson--no"]}>
              {!availableExam && !examHasBeenTaken && <FaLock />} Exam
            </span>
          </li>
          {/* Exam Link */}
          {/* <li
            className={`${classes["lessons__lesson"]} ${classes["lessons__lesson--active"]}`}
          >
            <span className={classes["lessons__lesson--no"]}>Lesson 1</span>
            <span
              className={`${classes["lessons__lesson--status"]} ${classes["lessons__lesson--status-active"]}`}
            >
              <FaCheck />
            </span>
          </li>
          <li
            className={`${classes["lessons__lesson"]} ${classes["lessons__lesson--active"]}`}
          >
            <span className={classes["lessons__lesson--no"]}>Lesson 2</span>
            <span className={`${classes["lessons__lesson--status"]}`}>
              <FaCheck />
            </span>
          </li>
          <li className={classes["lessons__lesson"]}>
            <span className={classes["lessons__lesson--no"]}>Lesson 3</span>
          </li>
          <li className={classes["lessons__lesson"]}>
            <span className={classes["lessons__lesson--no"]}>Lesson 4</span>
          </li>
          <li className={classes["lessons__lesson"]}>
            <span className={classes["lessons__lesson--no"]}>Lesson 5</span>
          </li>
          <li className={classes["lessons__lesson"]}> 
            <span className={classes["lessons__lesson--no"]}>Lesson 6</span>
          </li>*/}
        </ul>
      </div>
    </div>
  );
};

export default Lessons;
