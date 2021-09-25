import FullPreview from "../Preview/FullPreview";
import HalfPreview from "../Preview/HalfPreview";
import classes from "./HomeIntro.module.scss";
import Wrapper from "../UI/Wrapper";
import images from "../../assets";

const HomeIntro = () => {
  return (
    <Wrapper
      className={classes["home-intro"]}
      container={`${classes.container} container`}
    >
      <FullPreview image={images.gifs.homeWorkshop} />
      <HalfPreview image={images.gifs.homeGame} type="games" />
      <HalfPreview image={images.gifs.homeVideo} type="videos" />
    </Wrapper>
  );
};

export default HomeIntro;
