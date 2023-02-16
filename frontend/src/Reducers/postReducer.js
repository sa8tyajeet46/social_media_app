import { createReducer } from "@reduxjs/toolkit";
const initialState = {};
const postReducer = createReducer(initialState, {
  followingPostRequest: (state, action) => {
    state.loading = true;
  },
  followingPostSucess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  followingPostFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state, action) => {
    state.error = null;
  },
});

export default postReducer;
