import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import updatePassword from "./../actions/updatePassword";
import { useAlert } from "react-alert";
import { Cancel, Menu } from "@mui/icons-material";
import OverlaySidebar from "./OverlaySidebar";
import "./login.css";
function UpdatePassword() {
  const alert = useAlert();
  const dispatch = useDispatch();
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
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [menu, setMenu] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updatePassword(oldPassword, newPassword, confirmPassword));
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  return (
    <div className=" mainTab">
      <div className="adj">
        {menu && (
          <div className="can">
            <div onClick={() => setMenu(false)}>
              <Cancel></Cancel>
            </div>
          </div>
        )}
        {!menu && (
          <div className="ymenu">
            <Menu onClick={() => setMenu(true)}></Menu>
          </div>
        )}

        {menu && (
          <OverlaySidebar menu={menu} setMenu={setMenu}></OverlaySidebar>
        )}
      </div>
      <div className="subTab">
        <form onSubmit={(e) => handleSubmit(e)} className="loginForm">
          <input
            type="password"
            placeholder="old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="update password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
          <div className="buttonHolder">
            {" "}
            <button type="submit" disabled={loading}>
              update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;
