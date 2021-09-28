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
    showExamSheetModal,
    fetchDoneVideosRequest,
    fetchDoneGamesRequest,
  ]);

  return (
    <Fragment>
      <Breadcrumb />
      <div className="container">
        <h2 className="section-title">Dashboard</h2>
        <Profiles />
        {/* Workshops */}
        <Wrapper className="profile__workshops">
          <h2>Finished Workshops</h2>
          <Wrapper container="container container-grid-3x">
            {!doneWorkshops.length && (
              <h2>Your kid didn't join any workshops</h2>
            )}
            {isLoading && <LoadingSpinner />}
            {!isLoading &&
              doneWorkshops.length > 0 &&
              doneWorkshops.map((workshop) => {
                return (
                  <CardInfo
                    key={workshop.id}
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
        <Wrapper className="profile__workshops">
          <h2>Finished Games</h2>
          <Wrapper container="container container-grid-3x">
            {!doneGames.length && <h2>Your kid didn't play any game</h2>}
            {doneGamesLoading && <LoadingSpinner />}
            {!doneGamesLoading &&
              doneGames.length > 0 &&
              doneGames.map((game) => {
                return (
                  <CardInfo
                    key={game.id}
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
        <Wrapper className="profile__workshops">
          <h2>Finished Videos</h2>
          <Wrapper container="container container-grid-3x">
            {!doneVideos.length && <h2>Your kid didn't watch any video</h2>}
            {doneVideosLoading && <LoadingSpinner />}
            {!doneVideosLoading &&
              doneVideos.length > 0 &&
              doneVideos.map((video) => {
                return (
                  <CardInfo
                    key={video.id}
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
