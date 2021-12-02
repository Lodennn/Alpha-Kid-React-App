import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, persistLocalStorage } from "../../helpers";

const activeUserProfile = getLocalStorage("activeUserProfile");

const initialState = {
  profiles: [],
  activeUserProfile: activeUserProfile,
};

const profilesSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    getAllProfiles(state, action) {
      state.profiles = action.payload;
      if (state.profiles.length === 0) {
        state.activeUserProfile = null;
      }
    },
    addProfile(state, action) {
      state.profiles.push(action.payload);
    },
    setActiveProfile(state, action) {
      state.activeUserProfile = action.payload;
    },
  },
});

export const profilesActions = profilesSlice.actions;

export const addProfileToStorage = (profile) => (dispatch) => {
  dispatch(profilesActions.addProfile(profile));
  persistLocalStorage("activeUserProfile", profile);
};

export const changeActiveProfileFromStorage = (profile) => (dispatch) => {
  dispatch(profilesActions.setActiveProfile(profile));
  console.log("changeActiveProfileFromStorage: ", profile);
  persistLocalStorage("activeUserProfile", profile);
};

export default profilesSlice.reducer;
