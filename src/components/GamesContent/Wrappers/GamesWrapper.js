import Wrapper from "../../UI/Wrapper";
import Card from "../../UI/Card";
import classes from "./GamesWrapper.module.scss";
import images from "../../../assets";
import { Link } from "react-router-dom";

const GamesWrapper = (props) => {
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
      <Link to="/games/1">
        <Card className="card-main" type="game" image={images.games.game1} />
      </Link>
      <Link to="/games/2">
        <Card className="card-main" type="game" image={images.games.game2} />
      </Link>
      <Link to="/games/3">
        <Card className="card-main" type="game" image={images.games.game3} />
      </Link>
      <Link to="/games/4">
        <Card className="card-main" type="game" image={images.games.game4} />
      </Link>
    </Wrapper>
  );
};

export default GamesWrapper;
