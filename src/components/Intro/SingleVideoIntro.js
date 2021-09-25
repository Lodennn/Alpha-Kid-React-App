import Card from "../UI/Card";
import images from "../../assets";
import classes from "./SingleVideoIntro.module.scss";
import { Link } from "react-router-dom";

const SingleVideoIntro = () => {
  return (
    <section className={`${classes["single-video-intro"]}`}>
      <div className={`${classes.container} container`}>
        <div className={classes["main"]}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/69MU0tLNoRQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <h2 className={classes["section-title"]}>Same Company</h2>
        <Link to="/videos/1">
          <Card
            className={`${classes["card-main"]} card-main`}
            type="video"
            image={images.videos.video1}
          />
        </Link>
        <Link to="/videos/2">
          <Card
            className={`${classes["card-main"]} card-main`}
            type="video"
            image={images.videos.video2}
          />
        </Link>
      </div>
    </section>
  );
};

export default SingleVideoIntro;
