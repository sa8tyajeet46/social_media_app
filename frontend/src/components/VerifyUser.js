import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import verifyUser from "../actions/verify";
import "./login.css";
function VerifyUser() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const handleVerify = (e) => {
    e.preventDefault();
    //  console.log(token);
    dispatch(verifyUser(token));
  };
  return (
    <div className="mainTab">
      <div className="buttonHolder">
        <button onClick={(e) => handleVerify(e)}>verify your email</button>
      </div>
    </div>
  );
}

export default VerifyUser;
