import { useEffect } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import { fetchGames } from "../../../lib/api";
import Card from "../../UI/Card";
import Wrapper from "../../UI/Wrapper";
import LoadingSpinner from "../../UI/LoadingSpinner";
import classes from "./GamesWrapper.module.scss";

const GamesWrapper = (props) => {
  const {
    sendHttpRequest: fetchGamesRequest,
    data: games,
    isLoading,
  } = useHttp(fetchGames);

  useEffect(() => {
    fetchGamesRequest();
  }, [fetchGamesRequest]);

  return (
    <Wrapper
      className={`${
        props.wrapperImageClass
          ? classes["games-wrapper"]
          : classes["single-games-wrapper"]
      }`}
      container={`container-grid-4x container`}
    >
      <h2 className="section-title">{props.title}</h2>
      {!isLoading &&
        games &&
        games.length > 0 &&
        games.map((game) => {
          return (
            <Link key={game.id} to={`/games/${game.id}`}>
              <Card className="card-main" type="game" image={game.image} />
            </Link>
          );
        })}
      {isLoading && <LoadingSpinner />}
      {games.length === 0 && <h2>No Games Yet 😶</h2>}
    </Wrapper>
  );
};

export default GamesWrapper;
