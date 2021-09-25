import { Fragment } from "react";
import GamesIntro from "../Intro/GamesIntro";
import GamesWrapper from "./Wrappers/GamesWrapper";
import CharactersBar from "../Layout/CharactersBar/CharactersBar";
import MainLayoutWrapper from "../Layout/MainLayoutWrapper";

const GamesContent = () => {
  return (
    <Fragment>
      <MainLayoutWrapper>
        <CharactersBar />
        <GamesIntro />
        <GamesWrapper wrapperImageClass={true} title="All Games" />
      </MainLayoutWrapper>
    </Fragment>
  );
};

export default GamesContent;
