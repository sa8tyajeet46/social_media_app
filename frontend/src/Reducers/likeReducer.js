import { createReducer } from "@reduxjs/toolkit";
const initialState = {};
const likeReducer = createReducer(initialState, {
  likeRequest: (state, action) => {
    state.loading = true;
  },
  likeSucess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.liked = true;
  },
  likeFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.liked = false;
  },
  commentRequest: (state, action) => {
    state.loading = true;
  },
  commentSucess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.liked = true;
  },
  commentFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.liked = false;
  },
  deleteCommentRequest: (state, action) => {
    state.loading = true;
  },
  deleteCommentSucess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.liked = true;
  },
  deletecommentFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.liked = false;
  },

  PostRequest: (state, action) => {
    state.loading = true;
  },
  postSucess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.liked = true;
  },
  postFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.liked = false;
  },
  deletepostRequest: (state, action) => {
    state.loading = true;
  },
  deletepostSucess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.liked = true;
  },
  deletepostFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.liked = false;
  },
  editCaptionRequest: (state, action) => {
    state.loading = true;
  },
  editCaptionSucess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.liked = true;
  },
  editCaptionFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.liked = false;
  },
  editProfileRequest: (state, action) => {
    state.loading = true;
  },
  editProfileSucess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.liked = true;
  },
  editProfileFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.liked = false;
  },
  updatePasswordRequest: (state, action) => {
    state.loading = true;
  },
  updatePasswordSucess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.liked = true;
  },
  updatePasswordFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.liked = false;
  },
  deleteProfileRequest: (state, action) => {
    state.loading = true;
  },
  deleteProfileSucess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.liked = true;
  },
  deleteProfileFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.liked = false;
  },
  ForgotRequest: (state, action) => {
    state.loading = true;
  },
  ForgotSucess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.liked = true;
  },
  ForgotFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.liked = false;
  },
  ResetRequest: (state, action) => {
    state.loading = true;
  },
  ResetSucess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.liked = true;
  },
  ResetFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.liked = false;
  },
  FollowRequest: (state, action) => {
    state.loading = true;
  },
  FollowSucess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.liked = true;
  },
  FollowFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.liked = false;
  },
  clearError: (state, action) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export default likeReducer;
