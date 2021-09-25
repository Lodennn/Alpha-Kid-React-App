import FullPreview from "../Preview/FullPreview";
import classes from "./WorkshopsIntro.module.scss";
import Wrapper from "../UI/Wrapper";
import images from "../../assets";

const WorkshopsIntro = () => {
  return (
    <Wrapper className={classes["workshops-intro"]} container={`container`}>
      <FullPreview image={images.gifs.homeWorkshop} />
    </Wrapper>
  );
};

export default WorkshopsIntro;
