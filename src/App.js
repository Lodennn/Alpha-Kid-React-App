import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchAllUsers } from "./store/users/user.slice";
import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import WorkshopsPage from "./Pages/WorkshopsPage";
import GamesPage from "./Pages/GamesPage";
import VideosPage from "./Pages/VideosPage";
import SingleGamePage from "./Pages/SingleGamePage";
import SingleVideoPage from "./Pages/SingleVideoPage";
import SingleWorkshopPage from "./Pages/SingleWorkshopPage";
import ParentDashboard from "./Pages/Dashboard/ParentDashboard";
import TeacherDashboard from "./Pages/Dashboard/TeacherDashboard";
import AuthPage from "./Pages/AuthPage";
import PageNotFound from "./Pages/PageNotFound";
import ScrollToTop from "./components/UI/ScrollToTop";
import SnackBar from "./components/UI/SnackBar";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  const snackbar = useSelector((state) => state.snackbar);

  const dispatch = useDispatch();

  // Fetching All Users From Firebase
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <ScrollToTop>
      <SnackBar type={snackbar.type} message={snackbar.message} />
      <Switch>
        {/* Routing Begin */}
        <PrivateRoute path="/" exact>
          <HomePage />
        </PrivateRoute>
        <PrivateRoute path="/workshops" exact>
          <WorkshopsPage />
        </PrivateRoute>
        <PrivateRoute path="/workshops/:workshopId">
          <SingleWorkshopPage />
        </PrivateRoute>
        <PrivateRoute path="/games" exact>
          <GamesPage />
        </PrivateRoute>
        <PrivateRoute path="/games/:gameId">
          <SingleGamePage />
        </PrivateRoute>
        <PrivateRoute path="/videos" exact>
          <VideosPage />
        </PrivateRoute>
        <PrivateRoute path="/videos/:videoId">
          <SingleVideoPage />
        </PrivateRoute>
        <PrivateRoute path="/profile/parent">
          <ParentDashboard />
        </PrivateRoute>
        <PrivateRoute path="/profile/teacher">
          <TeacherDashboard />
        </PrivateRoute>
        <Route path="/login">
          {!isLoggedIn && <AuthPage />}
          {isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
        {/* Routing End */}
      </Switch>
    </ScrollToTop>
  );
}

export default App;
