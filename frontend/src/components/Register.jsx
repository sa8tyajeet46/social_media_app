import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import registerUser from "./../actions/register";
import "./login.css";
import { useNavigate } from "react-router-dom";
function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const { loading, error, message } = useSelector((state) => state.mail);
  const route = useNavigate();
  const dispatch = useDispatch();

  const alert = useAlert();
  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch({ type: "clearmailMessage" });
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "clearmailError" });
    }
  }, [dispatch, error, message]);
  const handleAvatar = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (avatar === "") {
      await alert.info("Set profile picture");
      return;
    }

    await dispatch(registerUser(email, password, name, avatar));
    setName("");
    setEmail("");
    setPassword("");
    // setAvatar("");
  };
  const handleTab = (e) => {
    e.preventDefault();
    route("/");
  };
  return (
    <div className="mainTab">
      <div className="subTab">
        {avatar && <img src={avatar} className="imgPreview"></img>}
        <form className="loginForm">
          <input
            type="text"
            value={name}
            placeholder="Enter profile Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="email"
            value={email}
            placeholder="Enter Email Id"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleAvatar(e)}
          ></input>
          <div className="buttonHolder">
            <button onClick={(e) => handleSubmit(e)} disabled={loading}>
              sign up
            </button>
          </div>
        </form>
        <div className="separator"></div>
        <div to="/register" className="pText">
          Already have an account?
        </div>
        <div className="buttonHolder">
          <button onClick={(e) => handleTab(e)} disabled={loading}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
