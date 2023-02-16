import { createReducer } from "@reduxjs/toolkit";
const initialState = {};
const allUserReducer = createReducer(initialState, {
  allUserRequest: (state, action) => {
    state.loading = true;
  },
  allUserSucess: (state, action) => {
    state.loading = false;
    state.users = action.payload;
  },
  allUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state, action) => {
    state.error = null;
  },
});

export default allUserReducer;
