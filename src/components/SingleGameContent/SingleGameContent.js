import { Fragment } from "react";
import SingleGameIntro from "../Intro/SingleGameIntro";
import GamesWrapper from "../GamesContent/Wrappers/GamesWrapper";
import MainLayoutWrapper from "../Layout/MainLayoutWrapper";

const SingleGameContent = () => {
  return (
    <Fragment>
      <MainLayoutWrapper>
        <SingleGameIntro />
        <GamesWrapper wrapperImageClass={false} title="All Games" />
      </MainLayoutWrapper>
    </Fragment>
  );
};

export default SingleGameContent;
