import Card from "../UI/Card";
import images from "../../assets";
import classes from "./SingleGameIntro.module.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { useParams } from "react-router";
import { fetchSameCategoryData, fetchSingleGame } from "../../lib/api";

const SingleGameIntro = () => {
  const params = useParams();

  const { gameId } = params;

  const { data: game, sendHttpRequest: fetchSingleGameRequest } =
    useHttp(fetchSingleGame);

  const {
    data: sameCategoryGames,
    isLoading: sameCategoryGamesLoading,
    sendHttpRequest: fetchSameCategoryGamesRequest,
  } = useHttp(fetchSameCategoryData);

  useEffect(() => {
    fetchSingleGameRequest(gameId).then((data) =>
      fetchSameCategoryGamesRequest({
        id: data.id,
        collection: "games",
        category: data.category,
      })
    );
  }, [gameId, fetchSingleGameRequest, fetchSameCategoryGamesRequest]);

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
        <h2 className={classes["section-title"]}>Same Category</h2>
        {!sameCategoryGamesLoading &&
          sameCategoryGames &&
          sameCategoryGames.length > 0 &&
          sameCategoryGames.slice(0, 2).map((game) => {
            return (
              <Link key={game.id} to={`/games/${game.id}`}>
                <Card
                  className={`${classes["card-main"]} card-main`}
                  type="game"
                  image={game.image}
                />
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default SingleGameIntro;
