import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import useHttp from "../../../hooks/use-http";
import {
  deleteDocFS,
  fetchDoneWorkshops,
  fetchDoneData,
} from "../../../lib/api";
import PrivateRoute from "../../../Pages/PrivateRoute/PrivateRoute";
import ExamSheet from "../../../Pages/ExamSheet";
import Breadcrumb from "../../UI/Breadcrumb";
import CardInfo from "../../UI/CardInfo";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Wrapper from "../../UI/Wrapper";
import Profiles from "./Profiles/Profiles";
import AccountUppernav from "../../Layout/AccountUppernav/AccountUppernav";

const ParentProfileContent = () => {
  const [showExamSheetModal, setShowExamSheetModal] = useState(false);

  const { profiles, activeUserProfile } = useSelector((state) => state.profile);

  const history = useHistory();

  const {
    data: doneWorkshops,
    isLoading,
    sendHttpRequest: fetchDoneWorkshopsRequest,
  } = useHttp(fetchDoneWorkshops);

  const { sendHttpRequest: deleteDocRequest } = useHttp(deleteDocFS);

  const {
    data: doneVideos,
    isLoading: doneVideosLoading,
    sendHttpRequest: fetchDoneVideosRequest,
  } = useHttp(fetchDoneData);

  const {
    data: doneGames,
    isLoading: doneGamesLoading,
    sendHttpRequest: fetchDoneGamesRequest,
  } = useHttp(fetchDoneData);

  const match = useRouteMatch();

  const showExamSheetModalHandler = (e) => {
    setShowExamSheetModal(true);
  };

  const hideExamSheetModalHandler = (e) => {
    setShowExamSheetModal(false);
  };

  const deleteDocHandler = ({ examSheetId, workshopId, doneWorkshopId }) => {
    deleteDocRequest({
      collection: "examSheets",
      docId: examSheetId,
    })
      .then((_) =>
        deleteDocRequest({
          collection: "doneWorkshops",
          docId: doneWorkshopId,
        })
      )
      .then((_) => history.push(`/workshops/${workshopId}`));
  };

  useEffect(() => {
    if (profiles.length > 0) {
      fetchDoneWorkshopsRequest(activeUserProfile.id);
      fetchDoneVideosRequest({
        collection: "doneVideos",
        profileId: activeUserProfile.id,
      });
      fetchDoneGamesRequest({
        collection: "doneGames",
        profileId: activeUserProfile.id,
      });
    }
  }, [
    activeUserProfile?.id,
    fetchDoneWorkshopsRequest,
    fetchDoneVideosRequest,
    fetchDoneGamesRequest,
    profiles.length,
  ]);

  return (
    <Fragment>
      <AccountUppernav />
      <Breadcrumb />
      <div className="container">
        <h2 className="section-title">Dashboard</h2>
        <Profiles />
        {/* Workshops */}
        <Wrapper className="profile__workshops">
          <h2 className="heading-secondary">Finished Workshops</h2>
          <Wrapper container="container container-grid-3x pt-xs">
            {doneWorkshops.length === 0 && (
              <h2>Your kid didn't join any workshops</h2>
            )}
            {isLoading && <LoadingSpinner />}
            {!isLoading &&
              doneWorkshops.length > 0 &&
              doneWorkshops.map((workshop) => {
                return (
                  <CardInfo
                    key={workshop.id}
                    type="workshops"
                    data={workshop}
                    onShowModal={showExamSheetModalHandler}
                    matchPath={match.path}
                    onDeleteExamSheet={deleteDocHandler}
                  />
                );
              })}
          </Wrapper>
          <PrivateRoute path="/profile/parent/:workshopId">
            {showExamSheetModal && (
              <ExamSheet onHide={hideExamSheetModalHandler} />
            )}
          </PrivateRoute>
        </Wrapper>
        {/* Workshops */}
        {/* Games */}
        <Wrapper className="profile__games">
          <h2 className="heading-secondary">Played Games</h2>
          <Wrapper container="container container-grid-3x pt-xs">
            {doneGames.length === 0 && (
              <h2>{activeUserProfile.name} didn't play any game</h2>
            )}
            {doneGamesLoading && <LoadingSpinner />}
            {!doneGamesLoading &&
              doneGames.length > 0 &&
              doneGames.map((game) => {
                return (
                  <CardInfo
                    key={game.id}
                    type="games"
                    data={game}
                    onShowModal={showExamSheetModalHandler}
                    matchPath={match.path}
                    onDeleteExamSheet={deleteDocHandler}
                  />
                );
              })}
          </Wrapper>
        </Wrapper>
        {/* Games */}
        {/* Videos */}
        <Wrapper className="profile__videos">
          <h2 className="heading-secondary">Watched Videos</h2>
          <Wrapper container="container container-grid-3x pt-xs">
            {doneVideos.length === 0 && (
              <h2>{activeUserProfile.name} didn't watch any video</h2>
            )}
            {doneVideosLoading && <LoadingSpinner />}
            {!doneVideosLoading &&
              doneVideos.length > 0 &&
              doneVideos.map((video) => {
                return (
                  <CardInfo
                    key={video.id}
                    type="videos"
                    data={video}
                    onShowModal={showExamSheetModalHandler}
                    matchPath={match.path}
                    onDeleteExamSheet={deleteDocHandler}
                  />
                );
              })}
          </Wrapper>
        </Wrapper>
        {/* Videos */}
      </div>
    </Fragment>
  );
};

export default ParentProfileContent;
