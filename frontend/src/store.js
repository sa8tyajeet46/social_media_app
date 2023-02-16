import { configureStore } from "@reduxjs/toolkit";

import postReducer from "./Reducers/postReducer";
import userReducer from "./Reducers/userReducer";
import allUserReducer from "./Reducers/allUserReducer";
import likeReducer from "./Reducers/likeReducer";
import MyPostReducer from "./Reducers/MyPostReducer";
import mailReducer from "./Reducers/mailReducer";
import suserReducer from "./Reducers/selectedUserReducer";
import spostReducer from "./Reducers/userProfile";
const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    allUser: allUserReducer,
    like: likeReducer,
    myPost: MyPostReducer,
    mail: mailReducer,
    suser: suserReducer,
    spost: spostReducer,
  },
});

export default store;
