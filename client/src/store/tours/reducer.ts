import { createSlice } from "@reduxjs/toolkit";

const toursReducer = createSlice({
  name: "tours",
  initialState: { tours: [], error: null },
  reducers: {
    setAllTours: (state, action) => {
      state.tours = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const toursActions = toursReducer.actions;
export default toursReducer.reducer;
