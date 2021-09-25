import classes from "./HalfPreview.module.scss";
import "../../styles/Buttons.scss";

const HalfPreview = (props) => {
  return (
    <div className={classes["half-preview"]}>
      <div className={classes["half-preview__image"]}>
        <img
          src={props.image}
          alt=""
          className={`${classes["half-preview__img"]} img-fluid`}
        />
      </div>
      <a
        href="/"
        className={`${classes.btn} btn btn--${
          props.type === "games" ? "secondary" : "tertiary"
        } btn--rounded`}
      >
        {props.type === "games" ? "Play Now" : "Watch Now"}
      </a>
    </div>
  );
};
export default HalfPreview;
