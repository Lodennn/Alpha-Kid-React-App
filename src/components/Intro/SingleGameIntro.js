import Card from "../UI/Card";
import images from "../../assets";
import classes from "./SingleGameIntro.module.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { useParams } from "react-router";
import { fetchSingleGame } from "../../lib/api";

const SingleGameIntro = () => {
  const params = useParams();

  const { gameId } = params;

  console.log("gameId", gameId);

  const { data: game, sendHttpRequest: fetchSingleGameRequest } =
    useHttp(fetchSingleGame);

  useEffect(() => {
    fetchSingleGameRequest(gameId);
  }, [gameId, fetchSingleGameRequest]);

  console.log("game: ", game);

  return (
    <section className={`${classes["single-game-intro"]}`}>
      <div className={`${classes.container} container`}>
        <div className={classes["main"]}>
          <iframe
            width="100%"
            height="100%"
            src={game.game}
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
