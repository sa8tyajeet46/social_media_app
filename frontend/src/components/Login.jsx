import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import logingUser from "../actions/login";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import "./login.css";
function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.user);
  const alert = useAlert();
  const route = useNavigate();
  const loginUser = (e) => {
    e.preventDefault();
    dispatch(logingUser(email, password));
  };
  const handleTab = (e) => {
    e.preventDefault();
    route("/register");
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearLError" });
    }
  }, [error, dispatch]);
  return (
    <div className=" mainTab">
      <div className="subTab">
        <form onSubmit={(e) => loginUser(e)} className="loginForm">
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div className="buttonHolder">
            <button type="submit" disabled={loading}>
              Login
            </button>
          </div>
        </form>
        <div className="fpp">
          <Link to="/forgot/password" className="forgotPassword">
            forgot Password?
          </Link>
        </div>
        <div className="separator"></div>
        <div to="/register" className="pText">
          Don't have an acount?
        </div>
        <div className="buttonHolder">
          <button onClick={(e) => handleTab(e)}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
