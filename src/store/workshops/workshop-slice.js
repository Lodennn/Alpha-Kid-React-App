import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workshops: [],
};

const workshopSlice = createSlice({
  name: "workshop",
  initialState: initialState,
  reducers: {
    getAllWorkshops(state, action) {
      state.workshops = action.payload;
    },
    addWorkshop(state, action) {
      state.workshops = state.workshops.concat(action.payload);
    },
  },
});

export const workshopActions = workshopSlice.actions;

export default workshopSlice.reducer;
