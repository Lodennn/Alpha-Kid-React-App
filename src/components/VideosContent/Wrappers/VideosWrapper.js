import Wrapper from "../../UI/Wrapper";
import Card from "../../UI/Card";
import classes from "./VideosWrapper.module.scss";
import images from "../../../assets";
import { Link } from "react-router-dom";

const VideosWrapper = (props) => {
  return (
    <Wrapper
      className={`${
        props.wrapperImageClass
          ? classes["videos-wrapper"]
          : classes["single-videos-wrapper"]
      }`}
      container={`container-grid-4x container`}
    >
      <h2 className="section-title color--white">{props.title}</h2>
      <Link to="/videos/1">
        <Card className="card-main" type="video" image={images.videos.video1} />
      </Link>
      <Link to="/videos/2">
        <Card className="card-main" type="video" image={images.videos.video2} />
      </Link>
      <Link to="/videos/3">
        <Card className="card-main" type="video" image={images.videos.video3} />
      </Link>
      <Link to="/videos/4">
        <Card className="card-main" type="video" image={images.videos.video4} />
      </Link>
    </Wrapper>
  );
};

export default VideosWrapper;
