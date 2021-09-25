import { Fragment } from "react";
import VideosIntro from "../Intro/VideosIntro";
import VideosWrapper from "./Wrappers/VideosWrapper";
import CharactersBar from "../Layout/CharactersBar/CharactersBar";
import MainLayoutWrapper from "../Layout/MainLayoutWrapper";

const VideosContent = () => {
  return (
    <Fragment>
      <MainLayoutWrapper>
        <CharactersBar />
        <VideosIntro />
        <VideosWrapper wrapperImageClass={true} title="All Videos" />
      </MainLayoutWrapper>
    </Fragment>
  );
};

export default VideosContent;
