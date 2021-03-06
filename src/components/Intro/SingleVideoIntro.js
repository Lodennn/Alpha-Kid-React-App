import Card from "../UI/Card";
import classes from "./SingleVideoIntro.module.scss";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { useParams } from "react-router";
import { fetchDataFS, fetchDocFS, insertDataFS } from "../../lib/api";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { useSelector } from "react-redux";

const SingleVideoIntro = () => {
  const params = useParams();

  const { activeUserProfile } = useSelector((state) => state.profile);

  const { videoId } = params;

  const { data: video, sendHttpRequest: fetchSingleVideoRequest } =
    useHttp(fetchDocFS);

  const {
    data: sameCategoryVideos,
    isLoading: sameCategoryVideosLoading,
    sendHttpRequest: fetchSameCategoryVideosRequest,
  } = useHttp(fetchDataFS);

  const { sendHttpRequest: insertDoneVideosRequest } = useHttp(insertDataFS);

  const [currentVideoId, setCurrentVideoId] = useState("");

  const opts = {
    width: "100%",
    height: "100%",
    title: "YouTube video player",
    frameBorder: "0",
    allow:
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  // when video ends
  const onPlayerStateChange = (event) => {
    if (event.data === 0) {
      insertDoneVideosRequest(
        {
          collection: "doneVideos",
          data: {
            videoId: video.id,
            ...video,
            profileId: activeUserProfile.id,
          },
        },
        ["image", "category", "video", "videoId", "profileId"]
      );
    }
  };

  useEffect(() => {
    fetchSingleVideoRequest({ collection: "videos", id: videoId })
      .then((data) => {
        fetchSameCategoryVideosRequest(
          {
            collection: "videos",
            queries: [
              { where: "category", condition: "==", value: data.category },
            ],
          },
          { id: data.id }
        );
        return data;
      })
      .then((data) => {
        if (data.video) {
          setCurrentVideoId(data.video.split("/").at(-1));
        }
      });
  }, [
    video.video,
    videoId,
    fetchSingleVideoRequest,
    fetchSameCategoryVideosRequest,
  ]);

  return (
    <section className={`${classes["single-video-intro"]}`}>
      <div className={`${classes.container} container`}>
        <div className={classes["main"]}>
          <div className="youtube-wrapper">
            <YouTube
              videoId={currentVideoId}
              opts={opts}
              onReady={onReady}
              onStateChange={onPlayerStateChange}
            />
          </div>
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
