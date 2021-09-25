import { FaGamepad, FaPlay } from "react-icons/fa";
import classes from "./Card.module.scss";
import { Link } from "react-router-dom";

const Card = (props) => {
  const imageAlternative = props.image.slice(0, 10);
  const cardClasses = props.className
    .split(" ")
    .map((cl) => classes[cl])
    .join(" ");
  return (
    <div className={cardClasses}>
      <img
        src={props.image}
        alt={`${imageAlternative}`}
        className={`${classes["card-main__img"]} img-fluid`}
      />
      {props.type === "workshop" && (
        <div className={classes["card__data"]}>
          <h4 className={classes["card__data--name"]}>{props.name}</h4>
          <Link
            to={props.to}
            className={`${classes.btn} btn btn--rounded btn--primary`}
          >
            Learn Now
          </Link>
        </div>
      )}
      {props.type !== "workshop" && (
        <span
          className={
            classes[`card-main--${props.type === "game" ? "game" : "video"}`]
          }
        >
          {props.type === "game" ? <FaGamepad /> : <FaPlay />}
        </span>
      )}
    </div>
  );
};

export default Card;
