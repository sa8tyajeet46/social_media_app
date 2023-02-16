import { createReducer } from "@reduxjs/toolkit";
const initialState = {};
const MyPostReducer = createReducer(initialState, {
  MyPostRequest: (state, action) => {
    state.loading = true;
  },
  MyPostSucess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  MyPostFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state, action) => {
    state.error = null;
  },
});

export default MyPostReducer;
