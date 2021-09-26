import Wrapper from "../../UI/Wrapper";
import Card from "../../UI/Card";
import classes from "./VideosWrapper.module.scss";
import images from "../../../assets";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import useHttp from "../../../hooks/use-http";
import { fetchVideos } from "../../../lib/api";

const VideosWrapper = (props) => {
  const {
    sendHttpRequest: fetchVideosRequest,
    data: videos,
    isLoading,
  } = useHttp(fetchVideos);

  useEffect(() => {
    fetchVideosRequest();
  }, [fetchVideosRequest]);
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
      {!isLoading &&
        videos &&
        videos.length > 0 &&
        videos.map((video) => {
          return (
            <Link key={video.id} to={`/videos/${video.id}`}>
              <Card className="card-main" type="video" image={video.image} />
            </Link>
          );
        })}
    </Wrapper>
  );
};

export default VideosWrapper;
