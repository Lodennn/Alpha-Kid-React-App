import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../../hooks/use-http";
import { fetchDoneWorkshops } from "../../../lib/api";
import SlickCarousal from "../../SlickCarousal/SlickCarousal";
import Breadcrumb from "../../UI/Breadcrumb";
import Profiles from "./Profiles/Profiles";

const ParentProfileContent = () => {
  const { activeUserProfile } = useSelector((state) => state.profile);
  const { data: doneWorkshops, sendHttpRequest: fetchDoneWorkshopsRequest } =
    useHttp(fetchDoneWorkshops);

  console.log("activeUserProfile: ", activeUserProfile.id);

  useEffect(() => {
    fetchDoneWorkshopsRequest(activeUserProfile.id);
  }, [activeUserProfile.id, fetchDoneWorkshopsRequest]);

  return (
    <Fragment>
      <Breadcrumb />
      <div className="container">
        <h2 className="section-title">Dashboard</h2>
        <Profiles />
        <SlickCarousal title="Workshops" data={doneWorkshops} />
        <SlickCarousal title="Recent Watched" />
        <SlickCarousal title="Recent Played" />
      </div>
    </Fragment>
  );
};

export default ParentProfileContent;
