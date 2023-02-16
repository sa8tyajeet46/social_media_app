import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import User from "./User";
import { Dialog } from "@mui/material";
import logoutUser from "./../actions/logout";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import loadmyPost from "./../actions/mypost";
import { useEffect } from "react";
import Post from "./Post";
import Loader from "./Loader";
import loadUser from "../actions/loadUser";
import deleteAccount from "./../actions/deleteAccount";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { KeyboardArrowDown, Menu } from "@mui/icons-material";
import "./account.css";
import OverlaySidebar from "./OverlaySidebar";
import { Cancel } from "@mui/icons-material";
import {
  ArrowCircleUp,
  ArrowCircleDown,
  KeyboardArrowUp,
  Delete,
  Edit,
} from "@mui/icons-material";
function Myaccount() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.user);
  const { error, posts, loading } = useSelector((state) => state.myPost);
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(false);
  const [menu, setMenu] = useState(false);
  const [drop, setDrop] = useState(true);
  const navigate = useNavigate();

  const {
    error: likeError,
    message,
    liked,
  } = useSelector((state) => state.like);
  useEffect(() => {
    dispatch(loadmyPost());
    dispatch(loadUser());
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearError" });
    }
  }, [dispatch, likeError, message, liked]);
  const handleLogout = async () => {
    if (!window.confirm("Are sure to you want to log out")) return;
    await dispatch(logoutUser());

    alert.success("Logout sucessfully");
  };
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are sure to delete your account")) return;
    await dispatch(deleteAccount());
    //dispatch(logoutUser());
    navigate("/");
  };
  return (
    <div>
      {loading ? (
        <Loader></Loader>
      ) : (
        <div>
          <div className="containere">
            {!drop && (
              <div className="tpwn" onClick={() => setDrop(true)}>
                <KeyboardArrowDown></KeyboardArrowDown>
              </div>
            )}
            {drop && (
              <div className="slthreepcn">
                <div className="iy">
                  <img
                    src={user.avatar.url ? user.avatar.url : ""}
                    className="aimg"
                  ></img>
                  <div>{user.name}</div>
                </div>

                <div className="pid">
                  <div className="dqp">
                    <div>{user.following.length}</div>
                    <button onClick={() => setFollowing(true)}>
                      Following
                    </button>
                  </div>
                  <div className="dqp">
                    <div>{user.followers.length}</div>
                    <button onClick={() => setFollowers(true)}>
                      Followers
                    </button>
                  </div>
                  <div className="dqp">
                    <div>{user.posts.length}</div>
                    <div className="tot">posts</div>
                  </div>
                </div>
                <div className="tpn">
                  <Link to="/update/password">Change Password</Link>
                  <Link to="/update/profile">Edit profile</Link>
                </div>
                <div className="lcon">
                  <button onClick={() => handleLogout()}>Logout</button>
                  <button onClick={(e) => handleDeleteAccount(e)}>
                    Delete Account
                  </button>
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
                        isDeletable={true}
                        isAcounnt={true}
                        isHome={false}
                      ></Post>
                    );
                  })}
                <div>
                  {(!posts || posts.length === 0) && (
                    <div className="pot">No Posts Yet</div>
                  )}
                </div>
              </div>
            </div>
            <div className="athreepcn">
              <div className="iy">
                <img
                  src={user.avatar.url ? user.avatar.url : ""}
                  className="aimg"
                ></img>
                <div>{user.name}</div>
              </div>
              <div>
                <div className="dqp">
                  <div>{user.following.length}</div>
                  <button onClick={() => setFollowing(true)}>Following</button>
                </div>
                <div className="dqp">
                  <div>{user.followers.length}</div>
                  <button onClick={() => setFollowers(true)}>Followers</button>
                </div>
                <div className="dqp">
                  <div>{user.posts.length}</div>
                  <div className="tot">posts</div>
                </div>
                <div className="lcon">
                  <button onClick={() => handleLogout()}>Logout</button>
                </div>
              </div>
              <div className="tpn">
                <Link to="/update/password">Change Password</Link>
                <Link to="/update/profile">Edit profile</Link>
              </div>
              <div className="lcon">
                <button onClick={(e) => handleDeleteAccount(e)}>
                  Delete Account
                </button>
              </div>
            </div>
            <Dialog open={followers} onClose={() => setFollowers(false)}>
              <div className="dialogBox">
                <div>Followers</div>
                {user.followers &&
                  user.followers.length > 0 &&
                  user.followers.map((like, i) => {
                    return (
                      <User
                        key={i}
                        name={like.name}
                        id={like._id}
                        avatar={like.avatar.url}
                      ></User>
                    );
                  })}
              </div>
            </Dialog>
            <Dialog open={following} onClose={() => setFollowing(false)}>
              <div className="dialogBox">
                <div>Following</div>
                {user.following &&
                  user.following.length > 0 &&
                  user.following.map((like, i) => {
                    return (
                      <User
                        key={i}
                        name={like.name}
                        id={like._id}
                        avatar={like.avatar.url}
                      ></User>
                    );
                  })}
              </div>
            </Dialog>
          </div>

          {/*
          <img src={user.avatar.url ? user.avatar.url : ""}></img>
          <div>{user.name}</div>
          <div>
            <button onClick={() => setFollowing(true)}>Following</button>
            <div>{user.following.length}</div>
          </div>
          <div>
            <button onClick={() => setFollowers(true)}>Followers</button>
            <div>{user.followers.length}</div>
          </div>
          <div>posts</div>
          <div>{user.posts.length}</div>
          <button onClick={() => handleLogout()}>Logout</button>
          <Link to="/update/password">Change Password</Link>
          <Link to="/update/profile">Edit profile</Link>
          <button onClick={(e) => handleDeleteAccount(e)}>
            Delete Account
          </button>
          <Dialog open={followers} onClose={() => setFollowers(false)}>
            <div className="dialogBox">
              <div>Followers</div>
              {user.followers &&
                user.followers.length > 0 &&
                user.followers.map((like, i) => {
                  return (
                    <User
                      key={i}
                      name={like.name}
                      id={like._id}
                      avatar={like.avatar.url}
                    ></User>
                  );
                })}
            </div>
          </Dialog>
          <Dialog open={following} onClose={() => setFollowing(false)}>
            <div className="dialogBox">
              <div>Following</div>
              {user.following &&
                user.following.length > 0 &&
                user.following.map((like, i) => {
                  return (
                    <User
                      key={i}
                      name={like.name}
                      id={like._id}
                      avatar={like.avatar.url}
                    ></User>
                  );
                })}
            </div>
          </Dialog>
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
                    isDeletable={true}
                    isAcounnt={true}
                    isHome={false}
                  ></Post>
                );
              })}
          </div>*/}
        </div>
      )}
    </div>
  );
}

export default Myaccount;
