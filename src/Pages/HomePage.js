import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeContent from "../components/HomeContent/HomeContent";
import useHttp from "../hooks/use-http";
import { fetchAllProfilesFS } from "../lib/api";
import { profilesActions } from "../store/profiles/profiles-slice";

const HomePage = () => {
  const { profiles, activeUserProfile } = useSelector((state) => state.profile);

  const {
    user: { id: userId, type },
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const { sendHttpRequest: fetchProfilesRequest } = useHttp(fetchAllProfilesFS);
  // Fetching All Profiles From Firebase
  useEffect(() => {
    if (type === "Parent") {
      fetchProfilesRequest(userId).then((profiles) => {
        dispatch(profilesActions.getAllProfiles(profiles));
        if (profiles.length > 0 && !!activeUserProfile) {
          dispatch(profilesActions.setActiveProfile(activeUserProfile));
        }
        if (profiles.length > 0 && !!!activeUserProfile) {
          dispatch(profilesActions.setActiveProfile(profiles[0]));
        }
      });
    }
  }, [userId, type, dispatch, fetchProfilesRequest]);
  return <HomeContent />;
};

export default HomePage;
