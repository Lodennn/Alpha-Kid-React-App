import { Fragment } from "react";
import WorkshopsIntro from "../Intro/WorkshopsIntro";
import WorkshopsWrapper from "./Wrappers/WorkshopsWrapper";
import CharactersBar from "../Layout/CharactersBar/CharactersBar";
import MainLayoutWrapper from "../Layout/MainLayoutWrapper";

const WorkshopsContent = () => {
  return (
    <Fragment>
      <MainLayoutWrapper>
        <CharactersBar />
        <WorkshopsIntro />
        <WorkshopsWrapper />
      </MainLayoutWrapper>
    </Fragment>
  );
};

export default WorkshopsContent;
