import { Fragment } from "react";
import HomeIntro from "../Intro/HomeIntro";
import Features from "./Features/Features";
import HomeWrapper from "./Wrappers/HomeWrapper";
import CharactersBar from "../Layout/CharactersBar/CharactersBar";
import MainLayoutWrapper from "../Layout/MainLayoutWrapper";
const HomeContent = () => {
  return (
    <Fragment>
      <MainLayoutWrapper>
        <CharactersBar />
        <HomeIntro />
        <Features />
        <HomeWrapper />
      </MainLayoutWrapper>
    </Fragment>
  );
};

export default HomeContent;
