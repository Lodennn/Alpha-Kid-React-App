import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../../hooks/use-http";
import { fetchDoneWorkshops } from "../../../lib/api";
import SlickCarousal from "../../SlickCarousal/SlickCarousal";
import Breadcrumb from "../../UI/Breadcrumb";
import CardInfo from "../../UI/CardInfo";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Wrapper from "../../UI/Wrapper";
import Profiles from "./Profiles/Profiles";

const ParentProfileContent = () => {
  const { activeUserProfile } = useSelector((state) => state.profile);
  const {
    data: doneWorkshops,
    isLoading,
    sendHttpRequest: fetchDoneWorkshopsRequest,
  } = useHttp(fetchDoneWorkshops);

  console.log("Parent.js = doneWorkshops: ", doneWorkshops);

  useEffect(() => {
    fetchDoneWorkshopsRequest(activeUserProfile.id);
  }, [activeUserProfile.id, fetchDoneWorkshopsRequest]);

  return (
    <Fragment>
      <Breadcrumb />
      <div className="container">
        <h2 className="section-title">Dashboard</h2>
        <Profiles />
        <Wrapper className="profile__workshops container-grid-3x">
          {isLoading && <LoadingSpinner />}
          {!isLoading &&
            doneWorkshops.length > 0 &&
            doneWorkshops.map((workshop) => {
              return <CardInfo key={workshop.id} data={workshop} />;
            })}
        </Wrapper>
        {/* <SlickCarousal title="Workshops" data={doneWorkshops} /> */}
        {/* <SlickCarousal title="Recent Watched" /> */}
        {/* <SlickCarousal title="Recent Played" /> */}
      </div>
    </Fragment>
  );
};

export default ParentProfileContent;
