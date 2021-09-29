import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../UI/Wrapper";
import Card from "../../UI/Card";
import { fetchGames, fetchVideos } from "../../../lib/api";
import useHttp from "../../../hooks/use-http";
import LoadingSpinner from "../../UI/LoadingSpinner";
import classes from "./HomeWrapper.module.scss";

const HomeWrapper = () => {
  const [mixedArray, setMixedArray] = useState([]);

  const { sendHttpRequest: fetchGamesRequest, isLoading: gamesLoading } =
    useHttp(fetchGames);

  const { sendHttpRequest: fetchVideosRequest, isLoading: videosLoading } =
    useHttp(fetchVideos);

  const shuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  useEffect(() => {
    fetchGamesRequest().then((games) =>
      fetchVideosRequest().then((videos) => {
        const fetchedGames = games.map((game) => ({ type: "game", ...game }));
        const fetchedVideos = videos.map((video) => ({
          type: "video",
          ...video,
        }));
        setMixedArray(shuffle([...fetchedGames, ...fetchedVideos]));
      })
    );
  }, [fetchGamesRequest, fetchVideosRequest]);

  return (
    <Wrapper
      className={classes["home-wrapper"]}
      container={`container-grid-4x container`}
    >
      {videosLoading && gamesLoading && <LoadingSpinner />}
      {mixedArray &&
        mixedArray.length > 0 &&
        mixedArray.map((item) => {
          return (
            <Link key={item.id} to={`/${item.type}s/${item.id}`}>
              <Card className="card-main" type={item.type} image={item.image} />
            </Link>
          );
        })}
    </Wrapper>
  );
};

export default HomeWrapper;
