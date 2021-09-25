import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./users/user.slice";
import snackbarReducer from "./snackbar/snackbar-slice";
import profileReducer from "./profiles/profiles-slice";
import workshopReducer from "./workshops/workshop-slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    snackbar: snackbarReducer,
    workshop: workshopReducer,
  },
});

export default store;
