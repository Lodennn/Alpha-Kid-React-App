import classes from "./GamesIntro.module.scss";
import Wrapper from "../UI/Wrapper";
import images from "../../assets/";
import HalfPreview from "../Preview/HalfPreview";
const GamesIntro = () => {
  return (
    <Wrapper
      className={classes["games-intro"]}
      container={`${classes.container} container`}
    >
      <HalfPreview image={images.gifs.games} type="games" />
    </Wrapper>
  );
};

export default GamesIntro;
