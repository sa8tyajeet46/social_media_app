import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import resetPassword from "./../actions/reset";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./login.css";
function ResetPassword() {
  const alert = useAlert();
  const { token } = useParams();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const {
    error: likeError,
    message,
    liked,
    loading,
  } = useSelector((state) => state.like);

  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearError" });
    }
  }, [dispatch, likeError, message, liked]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(resetPassword(token, password));
    setPassword("");
  };
  return (
    <div className=" mainTab">
      <div className="subTab">
        <form onSubmit={(e) => handleSubmit(e)} className="loginForm">
          <input
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

export default ResetPassword;
