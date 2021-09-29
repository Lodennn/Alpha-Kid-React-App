import { Link } from "react-router-dom";
import classes from "./CardInfo.module.scss";
import { useHistory } from "react-router";

const CardInfo = (props) => {
  const { data, type } = props;

  const history = useHistory();

  const goToPath = (page, id) => {
    history.push(`/${page}/${id}`);
  };

  const pagePath =
    type === "workshops"
      ? `/workshops/${data.workshopId}`
      : type === "games"
      ? `/games/${data.id}`
      : type === "videos" && `/videos/${data.id}`;

  return (
    <div className={classes["card-info"]}>
      <Link to={pagePath}>
        <div className={classes["card-info__image"]}>
          <img
            src={data.image}
            alt={data.name}
            className={`${classes["card-info__img"]} img-fluid`}
          />
        </div>
      </Link>
      <div className={classes["card-info__data"]}>
        {type === "workshops" && (
          <h3 className={classes["card-info__title"]}>{data.name}</h3>
        )}
        {type === "workshops" && (
          <>
            <Link
              className={classes["card-info__btn"]}
              onClick={props.onShowModal}
              to={`${props.matchPath}/${data.workshopId}`}
            >
              Show Exam Sheet
            </Link>
            <button
              className={classes["card-info__btn"]}
              onClick={props.onDeleteExamSheet.bind(null, {
                examSheetId: data.examSheetId,
                workshopId: data.workshopId,
                doneWorkshopId: data.id,
              })}
            >
              Take Exam Again
            </button>
          </>
        )}
        {type === "games" && (
          <>
            <h2>{data.category} game</h2>
            <button
              className={classes["card-info__btn"]}
              onClick={goToPath.bind(null, type, data.gameId)}
            >
              Play Game
            </button>
          </>
        )}
        {type === "videos" && (
          <>
            <h2>{data.category} video</h2>
            <button
              className={classes["card-info__btn"]}
              onClick={goToPath.bind(null, type, data.videoId)}
            >
              Watch Video
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CardInfo;
