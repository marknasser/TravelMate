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
    login_success: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.currentUser = action.payload.data.user;
      state.errorMessage = null;
    },
    login_fail: (state, action) => {
      state.token = null;
      state.isLoggedIn = false;
      state.currentUser = null;
      state.errorMessage = action.payload.message;
    },
    login_pending: (state, action) => {
      state.isPending = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.currentUser = null;
      state.errorMessage = null;
      state.isPending = false;
    },
  },
});

export const authActions = authReducer.actions;
export default authReducer.reducer;
