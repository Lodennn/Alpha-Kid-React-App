import { Fragment, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../../hooks/use-http";
import AddExam from "../../../Pages/AddExam";
import { workshopActions } from "../../../store/workshops/workshop-slice";
import PrivateRoute from "../../../Pages/PrivateRoute/PrivateRoute";
import SlickCarousal from "../../SlickCarousal/SlickCarousal";
import Alert from "../../UI/Alert";
import Breadcrumb from "../../UI/Breadcrumb";
import Button from "../../UI/Button";
import AddNewWorkshop from "./AddNewWorkshop/AddNewWorkshop";
import {
  fetchAllWorkshopsFS,
  fetchAvailableWorkshops,
  fetchNotAvailableWorkshops,
} from "../../../lib/api";

const TeacherProfileContent = () => {
  const [showNewExamModal, setShowNewExamModal] = useState(false);

  const [showNewWorkshop, setShowNewWorkshop] = useState(false);

  const showAddNewExamModalHandler = () => {
    setShowNewExamModal(true);
  };
  const hideAddNewExamModalHandler = () => {
    setShowNewExamModal(false);
  };

  const showNewWorkshopHandler = () => {
    setShowNewWorkshop(true);
  };
  const hideNewWorkshopHandler = () => {
    setShowNewWorkshop(false);
  };

  // Fetch All Workshops
  const { user } = useSelector((state) => state.user);

  const { id: userId } = user;

  const dispatch = useDispatch();

  const {
    data: allWorkshops,
    isLoading: allWorkshopsLoading,
    sendHttpRequest: getAllWorkshopsRequest,
  } = useHttp(fetchAllWorkshopsFS);

  const {
    data: availableWorkshops,
    isLoading: availableWorkshopsLoading,
    sendHttpRequest: getAvailableWorkshopsRequest,
  } = useHttp(fetchAvailableWorkshops);

  const {
    data: notAvailableWorkshops,
    isLoading: notAvailableWorkshopsLoading,
    sendHttpRequest: getNotAvailableWorkshopsRequest,
  } = useHttp(fetchNotAvailableWorkshops);

  useEffect(() => {
    getAllWorkshopsRequest().then((data) => {
      dispatch(workshopActions.getAllWorkshops(data));
    });
    getAvailableWorkshopsRequest(userId);
    getNotAvailableWorkshopsRequest(userId);
  }, [
    dispatch,
    getAllWorkshopsRequest,
    getAvailableWorkshopsRequest,
    getNotAvailableWorkshopsRequest,
    showNewWorkshop,
    showNewExamModal,
    userId,
  ]);

  return (
    <Fragment>
      <Breadcrumb />
      <div className="container">
        <h2 className="section-title">Dashboard</h2>
        <Button
          utility="mb-xl"
          type="button"
          icon={<FaPlus />}
          text="Create Workshop"
          onClick={showNewWorkshopHandler}
        />
        {showNewWorkshop && <AddNewWorkshop onHide={hideNewWorkshopHandler} />}

        {/* Completed Workshops */}
        <h2 className="section-title">Completed Workshops</h2>
        <SlickCarousal workshops={availableWorkshops} />

        {/* Incompleted Workshops */}
        <Alert
          text={`These workshops wont be available `}
          highlight={`unless you create an exam for it!`}
        />
        <h2 className="section-title">Incompleted Workshops</h2>

        {!notAvailableWorkshopsLoading && notAvailableWorkshops.length > 0 && (
          <SlickCarousal
            workshops={notAvailableWorkshops}
            onShowModal={showAddNewExamModalHandler}
          />
        )}
      </div>
      <PrivateRoute path="/profile/teacher/:workshopId">
        {showNewExamModal && <AddExam onHide={hideAddNewExamModalHandler} />}
      </PrivateRoute>
    </Fragment>
  );
};

export default TeacherProfileContent;
