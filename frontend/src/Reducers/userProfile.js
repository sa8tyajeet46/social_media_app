import { createReducer } from "@reduxjs/toolkit";
const initialState = {};
const spostReducer = createReducer(initialState, {
  sPostUserRequest: (state, action) => {
    state.loading = true;
  },
  sPostUserSucess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
    state.error = null;
  },
  sPostUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearpostTerror: (state) => {
    state.error = null;
  },
});

export default spostReducer;
