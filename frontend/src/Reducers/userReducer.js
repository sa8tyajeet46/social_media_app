import { createReducer } from "@reduxjs/toolkit";
const initialState = {};
const userReducer = createReducer(initialState, {
  loginRequest: (state, action) => {
    state.loading = true;
  },
  loginSucess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.error = null;
    state.isAuth = true;
  },
  loginFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuth = false;
  },
  loadUserRequest: (state, action) => {
    state.loading = true;
  },
  loadUserSucess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.error = null;
    state.isAuth = true;
  },
  loadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuth = false;
  },
  registerRequest: (state, action) => {
    state.loading = true;
  },
  registerSucess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.error = null;
    state.isAuth = true;
  },
  registerFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuth = false;
  },
  logoutRequest: (state, action) => {
    state.loading = true;
  },
  logoutSucess: (state, action) => {
    state.loading = false;
    state.user = null;
    // state.error = null;
    state.isAuth = false;
  },
  logoutFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuth = true;
  },
  clearLError: (state) => {
    state.error = null;
  },
});

export default userReducer;
