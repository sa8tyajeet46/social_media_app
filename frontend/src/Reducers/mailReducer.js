import { createReducer } from "@reduxjs/toolkit";
const initialState = {};
const mailReducer = createReducer(initialState, {
  mailRequest: (state, action) => {
    state.loading = true;
  },
  mailSucess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  mailFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearmailError: (state, action) => {
    state.error = null;
  },
  clearmailMessage: (state, action) => {
    state.message = null;
  },
});

export default mailReducer;
