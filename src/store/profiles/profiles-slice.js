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
      persistLocalStorage("activeUserProfile", action.payload);
    },
    setActiveProfile(state, action) {
      state.activeUserProfile = action.payload;
      persistLocalStorage("activeUserProfile", action.payload);
    },
  },
});

export const profilesActions = profilesSlice.actions;

export default profilesSlice.reducer;
