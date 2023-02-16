import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import loadPost from "./../actions/loadPost";
import Loader from "./Loader";
import Post from "./Post";
import allUser from "./../actions/allUser";
import User from "./User";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

import { useState } from "react";
import Sidebar from "./Sidebar";
import {
  Cancel,
  Menu,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import OverlaySidebar from "./OverlaySidebar";
function Home() {
  const alert = useAlert();
  const [menu, setMenu] = useState(false);
  const [drop, setDrop] = useState(true);
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.user);
  const { error, loading, posts } = useSelector((state) => state.posts);
  const {
    error: likeError,
    message,
    liked,
  } = useSelector((state) => state.like);
  const { error: userError, users } = useSelector((state) => state.allUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPost());
    dispatch(allUser("", 15));
    if (error) {
      alert.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearError" });
    }
  }, [dispatch, error, likeError, message, liked]);
  return (
    <div>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <div className="containere">
            {!drop && (
              <div className="tpwn" onClick={() => setDrop(true)}>
                <KeyboardArrowDown></KeyboardArrowDown>
              </div>
            )}
            {drop && (
              <div className="slthreepcn">
                <div className="putit">People you may know</div>
                <div className="userHolder">
                  {users ? (
                    users.length > 0 &&
                    users.map((e, i) => {
                      return (
                        /*<User
                          name={e.name}
                          id={e._id}
                          avatar={e.avatar.url}
                          key={i}
                        ></User>*/

                        <div
                          className="subtimg"
                          onClick={() => navigate(`/user/${e._id}`)}
                          key={i}
                        >
                          <img src={e.avatar.url}></img>
                          <div>{e.name}</div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="nshow">No one to show</div>
                  )}
                </div>

                <div
                  className="tpwn"
                  onClick={() => {
                    setDrop(false);
                  }}
                >
                  <KeyboardArrowUp></KeyboardArrowUp>
                </div>
              </div>
            )}
            <div className="onepcn">
              {menu && (
                <div className="can">
                  <div onClick={() => setMenu(false)}>
                    <Cancel></Cancel>
                  </div>
                </div>
              )}
              {!menu && (
                <div className="menu">
                  <Menu onClick={() => setMenu(true)}></Menu>
                </div>
              )}
              <Sidebar></Sidebar>
              {menu && (
                <OverlaySidebar menu={menu} setMenu={setMenu}></OverlaySidebar>
              )}
            </div>
            <div className="twopcn">
              <div>
                {posts &&
                  posts.length > 0 &&
                  posts.map((e, i) => {
                    return (
                      <Post
                        key={i}
                        postId={e._id}
                        caption={e.caption}
                        imageUrl={e.image.url}
                        createdAt={e.createdAt}
                        userName={e.postedBy.name}
                        userAvatar={e.postedBy.avatar.url}
                        userId={e.postedBy._id}
                        likes={e.likes.length}
                        likeA={e.likes}
                        comments={e.comments}
                        isHome={true}
                      ></Post>
                    );
                  })}
                <div>
                  {(!posts || posts.length === 0) && <div>No Posts Found</div>}
                </div>
              </div>
            </div>
            <div className="threepcn">
              <div className="utit">People you may know</div>
              {users ? (
                users.length > 0 &&
                users.map((e, i) => {
                  return (
                    <User
                      name={e.name}
                      id={e._id}
                      avatar={e.avatar.url}
                      key={i}
                    ></User>
                  );
                })
              ) : (
                <div className="nshow">No one to show</div>
              )}
            </div>
          </div>
          {/*
          <Link to="/account/me">account</Link>
          <Link to="/create/Post">Add Post</Link>
          <Link to="/search">Search</Link>
          <div>
            {posts &&
              posts.length > 0 &&
              posts.map((e, i) => {
                return (
                  <Post
                    key={i}
                    postId={e._id}
                    caption={e.caption}
                    imageUrl={e.image.url}
                    createdAt={e.createdAt}
                    userName={e.postedBy.name}
                    userAvatar={e.postedBy.avatar.url}
                    userId={e.postedBy._id}
                    likes={e.likes.length}
                    likeA={e.likes}
                    comments={e.comments}
                    isHome={true}
                  ></Post>
                );
              })}
            <div>
              {(!posts || posts.length === 0) && <div>No Posts Found</div>}
            </div>
          </div>
          <div>
            {users &&
              users.length > 0 &&
              users.map((e, i) => {
                return (
                  <User
                    name={e.name}
                    id={e._id}
                    avatar={e.avatar.url}
                    key={i}
                  ></User>
                );
              })}
          </div>
*/}
        </>
      )}
    </div>
  );
}
//npm install --legacy-peer-deps @mui/material @emotion/react @emotion/styled
export default Home;
