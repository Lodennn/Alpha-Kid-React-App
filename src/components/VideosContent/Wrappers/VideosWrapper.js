import Wrapper from "../../UI/Wrapper";
import Card from "../../UI/Card";
import classes from "./VideosWrapper.module.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import useHttp from "../../../hooks/use-http";
import { fetchDataFS } from "../../../lib/api";
import LoadingSpinner from "../../UI/LoadingSpinner";

const VideosWrapper = (props) => {
  const {
    sendHttpRequest: fetchVideosRequest,
    data: videos,
    isLoading,
  } = useHttp(fetchDataFS);

  useEffect(() => {
    fetchVideosRequest({ collection: "videos" });
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
      {isLoading && <LoadingSpinner />}
      {videos.length === 0 && <h2>No Videos Yet 😶</h2>}
    </Wrapper>
  );
};

export default VideosWrapper;
