import { createReducer } from "@reduxjs/toolkit";
const initialState = {};
const suserReducer = createReducer(initialState, {
  sUserRequest: (state, action) => {
    state.loading = true;
  },
  sUserSucess: (state, action) => {
    state.loading = false;
    state.suser = action.payload;
    state.error = null;
  },
  sUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearTerror: (state) => {
    state.error = null;
  },
});

export default suserReducer;
