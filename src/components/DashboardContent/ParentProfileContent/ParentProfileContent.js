import { Fragment } from "react";
import SlickCarousal from "../../SlickCarousal/SlickCarousal";
import Breadcrumb from "../../UI/Breadcrumb";
import Profiles from "./Profiles/Profiles";

const ParentProfileContent = () => {
  return (
    <Fragment>
      <Breadcrumb />
      <div className="container">
        <h2 className="section-title">Dashboard</h2>
        <Profiles />
        <SlickCarousal title="Recent Watched" />
        <SlickCarousal title="Recent Played" />
      </div>
    </Fragment>
  );
};

export default ParentProfileContent;
