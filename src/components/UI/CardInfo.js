import { Link } from "react-router-dom";
import classes from "./CardInfo.module.scss";

const CardInfo = (props) => {
  const { data } = props;

  return (
    <div className={classes["card-info"]}>
      <Link to={`/workshops/${data.workshopId}`}>
        <div className={classes["card-info__image"]}>
          <img
            src={data.image}
            alt={data.name}
            className={`${classes["card-info__img"]} img-fluid`}
          />
        </div>
      </Link>
      <div className={classes["card-info__data"]}>
        <h3 className={classes["card-info__title"]}>{data.name}</h3>
        <Link
          className={classes["card-info__btn"]}
          onClick={props.onShowModal}
          to={`${props.matchPath}/${data.workshopId}`}
        >
          Show Exam Sheet
        </Link>
        <button className={classes["card-info__btn"]}>Take Exam Again</button>
      </div>
    </div>
  );
};

export default CardInfo;
