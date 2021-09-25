import images from "../../../assets";
import classes from "./Features.module.scss";

const Features = () => {
  return (
    <section className={classes.features}>
      <div className="container">
        <h2 className={`${classes["features-heading"]} heading-2`}>
          What we provide ?
        </h2>
        <div className="container-grid-3x mt-sm">
          <div className={classes.feature}>
            <div className={classes["feature__image"]}>
              <img
                src={images.features.workshop}
                alt="Feature 1"
                className={`${classes["feature__img"]} img-fluid`}
              />
            </div>
            <h4 className="heading-4">Workshops</h4>
            <p className={classes["feature__text"]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div className={classes.feature}>
            <div className={classes["feature__image"]}>
              <img
                src={images.features.computer}
                alt="Feature 2"
                className={`${classes["feature__img"]} img-fluid`}
              />
            </div>
            <h4 className="heading-4">Videos</h4>
            <p className={classes["feature__text"]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div className={classes.feature}>
            <div className={classes["feature__image"]}>
              <img
                src={images.features.blocks}
                alt="Feature 3"
                className={`${classes["feature__img"]} img-fluid`}
              />
            </div>
            <h4 className="heading-4">Games</h4>
            <p className={classes["feature__text"]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
