import React from "react";
import { useState } from "react";
import uploadPost from "./../actions/createPost";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import OverlaySidebar from "./OverlaySidebar";
import { Menu, Cancel } from "@mui/icons-material";
import "./login.css";
function CreatePost() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {
    loading,
    error: likeError,
    message,
    liked,
  } = useSelector((state) => state.like);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [menu, setMenu] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert.info("set post image");
      return;
    }
    dispatch(uploadPost(caption, image));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };
  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearError" });
    }
    setImage(null);
    setCaption("");
  }, [dispatch, likeError, message, liked]);
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
        {image && <img src={image} className="imgPreviewT"></img>}
        <form className="loginForm">
          <input
            type="text"
            value={caption}
            placeholder="Enter Caption"
            onChange={(e) => setCaption(e.target.value)}
          ></input>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleImageChange(e);
            }}
          ></input>
          <div className="buttonHolder">
            <button disabled={loading} onClick={(e) => handleSubmit(e)}>
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
