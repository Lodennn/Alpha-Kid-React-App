import Card from "../UI/Card";
import images from "../../assets";
import classes from "./SingleVideoIntro.module.scss";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { useParams } from "react-router";
import { fetchSameCategoryData, fetchSingleVideo } from "../../lib/api";
import { useEffect } from "react";

const SingleVideoIntro = () => {
  const params = useParams();

  const { videoId } = params;

  const { data: video, sendHttpRequest: fetchSingleVideoRequest } =
    useHttp(fetchSingleVideo);

  const {
    data: sameCategoryVideos,
    isLoading: sameCategoryVideosLoading,
    sendHttpRequest: fetchSameCategoryVideosRequest,
  } = useHttp(fetchSameCategoryData);

  useEffect(() => {
    fetchSingleVideoRequest(videoId).then((data) =>
      fetchSameCategoryVideosRequest({
        id: data.id,
        collection: "videos",
        category: data.category,
      })
    );
  }, [videoId, fetchSingleVideoRequest, fetchSameCategoryVideosRequest]);

  return (
    <section className={`${classes["single-video-intro"]}`}>
      <div className={`${classes.container} container`}>
        <div className={classes["main"]}>
          <iframe
            width="100%"
            height="100%"
            src={video.video}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <h2 className={classes["section-title"]}>Same Category</h2>
        {!sameCategoryVideosLoading &&
          sameCategoryVideos &&
          sameCategoryVideos.length > 0 &&
          sameCategoryVideos.slice(0, 2).map((video) => {
            return (
              <Link key={video.id} to={`/videos/${video.id}`}>
                <Card
                  className={`${classes["card-main"]} card-main`}
                  type="video"
                  image={video.image}
                />
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default SingleVideoIntro;
