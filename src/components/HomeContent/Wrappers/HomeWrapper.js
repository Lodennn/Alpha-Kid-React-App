import Wrapper from "../../UI/Wrapper";
import Card from "../../UI/Card";
import classes from "./HomeWrapper.module.scss";
import images from "../../../assets";

const HomeWrapper = () => {
  return (
    <Wrapper
      className={classes["home-wrapper"]}
      container={`container-grid-4x container`}
    >
      <Card className="card-main" type="game" image={images.games.game1} />
      <Card className="card-main" type="video" image={images.games.game2} />
      <Card className="card-main" type="game" image={images.games.game3} />
      <Card className="card-main" type="video" image={images.games.game4} />
    </Wrapper>
  );
};

export default HomeWrapper;
