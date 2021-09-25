import classes from "./FullPreview.module.scss";
import "../../styles/Buttons.scss";

const FullPreview = (props) => {
  return (
    <div className={classes["full-preview"]}>
      <div className={classes["full-preview__image"]}>
        <img
          src={props.image}
          alt=""
          className={`${classes["full-preview__img"]} img-fluid`}
        />
      </div>
      <div className={classes["full-preview__data"]}>
        <h3 className={classes["full-preview__data--name"]}>Alphabetic</h3>
        <h3 className={classes["full-preview__data--label"]}>
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </h3>
        <a href="/" className={`${classes.btn} btn btn--primary btn--rounded`}>
          Learn Now
        </a>
      </div>
    </div>
  );
};

export default FullPreview;
