import { configureStore, combineReducers } from "@reduxjs/toolkit";

import toursReducer from "./tours";
import authReducer from "./auth";

//create root reducer to combine all the reducers from all the slises
const rootReducer = combineReducers({
  tours: toursReducer,
  auth: authReducer,
});

//create store
const store = configureStore({
  reducer: rootReducer,
});

// export type RootState = ReturnType<typeof store.getState>;
store.getState();
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
