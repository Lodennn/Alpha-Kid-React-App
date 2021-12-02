import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeContent from "../components/HomeContent/HomeContent";
import useHttp from "../hooks/use-http";
import { fetchDataFS } from "../lib/api";
import {
  changeActiveProfileFromStorage,
  profilesActions,
} from "../store/profiles/profiles-slice";

const HomePage = () => {
  const { activeUserProfile } = useSelector((state) => state.profile);

  const {
    user: { id: userId, type },
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const { sendHttpRequest: fetchProfilesRequest } = useHttp(fetchDataFS);
  // Fetching All Profiles From Firebase
  useEffect(() => {
    if (type === "Parent") {
      fetchProfilesRequest({
        collection: "profiles",
        queries: [{ where: "parentId", condition: "==", value: userId }],
      }).then((profiles) => {
        dispatch(profilesActions.getAllProfiles(profiles));
        if (profiles.length > 0 && !!activeUserProfile) {
          dispatch(changeActiveProfileFromStorage(activeUserProfile));
        }
        if (profiles.length > 0 && !!!activeUserProfile) {
          dispatch(changeActiveProfileFromStorage(profiles[0]));
        }
      });
    }
  }, [userId, type, dispatch, fetchProfilesRequest, activeUserProfile]);
  return <HomeContent />;
};

export default HomePage;
