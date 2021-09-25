import classes from "./VideosIntro.module.scss";
import Wrapper from "../UI/Wrapper";
import images from "../../assets";
import HalfPreview from "../Preview/HalfPreview";

const VideosIntro = () => {
  return (
    <Wrapper
      className={classes["videos-intro"]}
      container={`${classes.container} container`}
    >
      <HalfPreview image={images.gifs.videos} type="videos" />
    </Wrapper>
  );
};

export default VideosIntro;
