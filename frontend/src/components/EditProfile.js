import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import editprofile from "./../actions/editProfile";
import loadUser from "./../actions/loadUser";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import "./login.css";
import { Cancel, Menu } from "@mui/icons-material";
import OverlaySidebar from "./OverlaySidebar";
function EditProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(null);
  const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);
  const [menu, setMenu] = useState(false);
  const alert = useAlert();
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
  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
        setAvatarPrev(Reader.result);
      }
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editprofile(name, avatar));
    dispatch(loadUser());
  };
  return (
    <div className="mainTab">
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
        {avatarPrev && <img src={avatarPrev} className="imgPreview"></img>}
        <form onSubmit={(e) => handleSubmit(e)} className="loginForm">
          <input
            type="text"
            placeholder="change Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="file"
            onChange={(e) => handleChangeImg(e)}
            accept="image/*"
          ></input>
          <div className="buttonHolder">
            <button type="submit" disabled={loading}>
              change Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
