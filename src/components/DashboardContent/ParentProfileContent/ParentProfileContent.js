import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import useHttp from "../../../hooks/use-http";
import {
  deleteDocFS,
  fetchDoneWorkshops,
  fetchExamSheet,
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
  const [examSheet, setExamSheet] = useState({});
  const { profiles, activeUserProfile } = useSelector((state) => state.profile);
  const {
    data: doneWorkshops,
    isLoading,
    sendHttpRequest: fetchDoneWorkshopsRequest,
  } = useHttp(fetchDoneWorkshops);

  const { sendHttpRequest: deleteDocRequest } = useHttp(deleteDocFS);

  const match = useRouteMatch();

  const showExamSheetModalHandler = (e) => {
    setShowExamSheetModal(true);
  };

  const hideExamSheetModalHandler = (e) => {
    setShowExamSheetModal(false);
  };

  const getExamSheetHandler = (examSheet) => {
    setExamSheet(examSheet);
  };
  const deleteDocHandler = () => {
    deleteDocRequest({});
  };

  useEffect(() => {
    if (profiles.length > 0) {
      fetchDoneWorkshopsRequest(activeUserProfile.id);
    }
  }, [activeUserProfile?.id, fetchDoneWorkshopsRequest, showExamSheetModal]);

  return (
    <Fragment>
      <Breadcrumb />
      <div className="container">
        <h2 className="section-title">Dashboard</h2>
        <Profiles />
        <Wrapper className="profile__workshops">
          <h2>Finished Workshops</h2>
          <Wrapper container="container container-grid-3x">
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
      </div>
    </Fragment>
  );
};

export default ParentProfileContent;
