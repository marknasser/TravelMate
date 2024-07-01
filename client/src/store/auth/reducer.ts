import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isLoggedIn: false,
    currentUser: null,
    errorMessage: null,
    isPending: false,
  },

  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.currentUser = action.payload.data.user;
      state.errorMessage = null;
    },

    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.currentUser = null;
      state.errorMessage = null;
    },

    updateMe: (state, action) => {
      state.currentUser = action.payload;
    },

    process_pending: (state, action) => {
      state.isPending = action.payload;
    },

    process_fail: (state, action) => {
      state.errorMessage = action.payload.message;
    },
  },
});

export const authActions = authReducer.actions;
export default authReducer.reducer;
