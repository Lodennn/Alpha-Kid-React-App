import Card from "../UI/Card";
import classes from "./SingleGameIntro.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { useParams } from "react-router";
import { fetchDataFS, fetchDocFS, insertDataFS } from "../../lib/api";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";

const SingleGameIntro = () => {
  const params = useParams();

  const { gameId } = params;

  const { activeUserProfile } = useSelector((state) => state.profile);

  const { data: game, sendHttpRequest: fetchSingleGameRequest } =
    useHttp(fetchDocFS);

  const {
    data: sameCategoryGames,
    isLoading: sameCategoryGamesLoading,
    sendHttpRequest: fetchSameCategoryGamesRequest,
  } = useHttp(fetchDataFS);

  const { sendHttpRequest: insertDoneGamesRequest } = useHttp(insertDataFS);

  const [currentGameId, setCurrentGameId] = useState("");

  const opts = {
    width: "100%",
    height: "100%",
    title: "YouTube video player",
    frameBorder: "0",
    allow:
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  // when video ends
  const onPlayerStateChange = (event) => {
    if (event.data === 0) {
      insertDoneGamesRequest(
        {
          collection: "doneGames",
          data: { gameId: game.id, ...game, profileId: activeUserProfile.id },
        },
        ["image", "category", "game", "gameId", "profileId"]
      );
    }
  };

  useEffect(() => {
    fetchSingleGameRequest({ collection: "games", id: gameId })
      .then((data) => {
        fetchSameCategoryGamesRequest(
          {
            collection: "games",
            queries: [
              { where: "category", condition: "==", value: data.category },
            ],
          },
          { id: data.id }
        );
        return data;
      })
      .then((data) => setCurrentGameId(data.game.split("/").at(-1)));
  }, [gameId, fetchSingleGameRequest, fetchSameCategoryGamesRequest]);

  return (
    <section className={`${classes["single-game-intro"]}`}>
      <div className={`${classes.container} container`}>
        <div className={classes["main"]}>
          <div className="youtube-wrapper">
            <YouTube
              videoId={currentGameId}
              opts={opts}
              onReady={onReady}
              onStateChange={onPlayerStateChange}
            />
          </div>
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
