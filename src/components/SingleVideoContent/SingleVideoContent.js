import { Fragment } from "react";
import SingleVideoIntro from "../Intro/SingleVideoIntro";
import MainLayoutWrapper from "../Layout/MainLayoutWrapper";
import VideosWrapper from "../VideosContent/Wrappers/VideosWrapper";

const SingleVideoContent = () => {
  return (
    <Fragment>
      <MainLayoutWrapper>
        <SingleVideoIntro />
        <VideosWrapper wrapperImageClass={false} title="All Videos" />
      </MainLayoutWrapper>
    </Fragment>
  );
};

export default SingleVideoContent;
