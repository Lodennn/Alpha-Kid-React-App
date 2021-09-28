import { useEffect, useState } from "react";
import { FaCheck, FaLock } from "react-icons/fa";
import classes from "./Lessons.module.scss";

const Lessons = (props) => {
  const { lessons: watchedLessons } = props;

  const [activeLesson, setActiveLesson] = useState(watchedLessons[0]);

  const [availableExam, setAvailableExam] = useState(false);

  const [startExam, setStartExam] = useState(false);

  const { getActiveLesson, getExam, isExamDone, examHasBeenTaken } = props;

  useEffect(() => {
    getActiveLesson(activeLesson);
    setAvailableExam(watchedLessons.every((lesson) => lesson.watched));
    getExam(startExam);
  }, [getActiveLesson, activeLesson, getExam, startExam, watchedLessons]);

  const setActiveWatchedLesson = (lesson) => {
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
        </ul>
      </div>
    </div>
  );
};

export default Lessons;
