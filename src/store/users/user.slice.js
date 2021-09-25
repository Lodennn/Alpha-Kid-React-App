import { createSlice } from "@reduxjs/toolkit";
import {
  clearLocalStorage,
  getLocalStorage,
  persistLocalStorage,
} from "../../helpers";
import { getUsers, addUser } from "../../lib/api";

const userToken = getLocalStorage("token", false);
const activeUser = getLocalStorage("activeUser");

const initialState = {
  users: [],
  user: activeUser,
  idToken: userToken,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getAllUsersData(state, action) {
      state.users = action.payload;
      state.isLoggedIn = state.user && !!state.idToken;
    },
    login(state, action) {
      state.user = action.payload.user;
      state.idToken = action.payload.idToken;
      state.isLoggedIn = state.user && !!state.idToken;
      persistLocalStorage("token", action.payload.idToken, false);
      persistLocalStorage("activeUser", action.payload.user);
    },
    signup(state, action) {
      state.users = state.users.concat(action.payload);
      state.user = action.payload.user;
      state.idToken = action.payload.idToken;
      state.isLoggedIn = state.user && !!state.idToken;
      persistLocalStorage("token", state.idToken, false);
      persistLocalStorage("activeUser", action.payload.user);
    },
    logout(state, action) {
      state.idToken = null;
      state.user = {};
      state.isLoggedIn = false;
      clearLocalStorage();
    },
  },
});

export const userActions = userSlice.actions;

export const insertUserData = (userData) => (dispatch) => {
  addUser(userData).then((data) => {
    dispatch(userActions.signup({ user: data.user, idToken: data.idToken }));
  });
};

export const fetchAllUsers = () => (dispatch) => {
  getUsers().then((data) => {
    dispatch(userActions.getAllUsersData(data));
  });
};

export default userSlice.reducer;
