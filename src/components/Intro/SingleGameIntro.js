import Card from "../UI/Card";
import images from "../../assets";
import classes from "./SingleGameIntro.module.scss";
import { Link } from "react-router-dom";

const SingleGameIntro = () => {
  return (
    <section className={`${classes["single-game-intro"]}`}>
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
        <Link to="/games/1">
          <Card
            className={`${classes["card-main"]} card-main`}
            type="game"
            image={images.games.game1}
          />
        </Link>
        <Link to="/games/2">
          <Card
            className={`${classes["card-main"]} card-main`}
            type="game"
            image={images.games.game2}
          />
        </Link>
      </div>
    </section>
  );
};

export default SingleGameIntro;
