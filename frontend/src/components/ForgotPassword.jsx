import React from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import forgotPassword from "./../actions/forgot";
import { useAlert } from "react-alert";
import "./login.css";
function ForgotPassword() {
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const {
    error: likeError,
    message,
    loading,
  } = useSelector((state) => state.like);
  useEffect(() => {
    //console.log(likeError);
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearError" });
    }
  }, [dispatch, likeError, message]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword(email));
    setEmail("");
  };
  return (
    <div className=" mainTab">
      <div className="subTab">
        <form className="loginForm" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Registered Email Id"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <div className="buttonHolder">
            <button type="submit" disabled={loading}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
