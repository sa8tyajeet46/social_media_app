import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { useDispatch } from "react-redux";
import loadUser from "./actions/loadUser";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Home from "./components/Home";
import Myaccount from "./components/Myaccount";
import CreatePost from "./components/CreatePost";
import Register from "./components/Register";
import VerifyUser from "./components/VerifyUser";
import EditProfile from "./components/EditProfile";
import UpdatePassword from "./components/UpdatePassword";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import UserProfile from "./components/UserProfile";
import webFont from "webfontloader";
import { useAlert } from "react-alert";
import "./App.css";

import Search from "./components/Search";
function App() {
  const { isAuth } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    webFont.load({
      google: {
        families: [
          "Roboto",
          "Poppins",
          "Caveat",
          "Noto Sans",
          "Roboto Mono",
          "Ubuntu",
          "Inter",
          "Zeyada",
        ],
      },
    });
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/account/me"
          element={isAuth ? <Myaccount></Myaccount> : <Login></Login>}
        ></Route>
        <Route
          path="/create/Post"
          element={isAuth ? <CreatePost></CreatePost> : <Login></Login>}
        ></Route>
        <Route
          path="/"
          element={isAuth ? <Home></Home> : <Login></Login>}
        ></Route>
        <Route
          path="/register"
          element={isAuth ? <Myaccount></Myaccount> : <Register></Register>}
        ></Route>
        <Route
          path="/confirm/signUp/:token"
          element={isAuth ? <Myaccount></Myaccount> : <VerifyUser></VerifyUser>}
        ></Route>
        <Route
          path="/update/profile"
          element={isAuth ? <EditProfile></EditProfile> : <Login></Login>}
        ></Route>
        <Route
          path="update/password"
          element={isAuth ? <UpdatePassword></UpdatePassword> : <Login></Login>}
        ></Route>
        <Route
          path="/forgot/password"
          element={isAuth ? <Home></Home> : <ForgotPassword></ForgotPassword>}
        ></Route>
        <Route
          path="/password/reset/:token"
          element={isAuth ? <Home></Home> : <ResetPassword></ResetPassword>}
        ></Route>
        <Route
          path="/user/:id"
          element={isAuth ? <UserProfile></UserProfile> : <Login></Login>}
        ></Route>
        <Route
          path="/search"
          element={isAuth ? <Search></Search> : <Login></Login>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
