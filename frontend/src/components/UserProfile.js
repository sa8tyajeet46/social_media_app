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
import deleteAccount from "./../actions/deleteAccount";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import loadsUser from "./../actions/loadSuser";
import userPost from "./../actions/userPost";
import follow from "../actions/follow";
import "./account.css";
import {
  Cancel,
  Menu,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import Sidebar from "./Sidebar";
import OverlaySidebar from "./OverlaySidebar";
function UserProfile() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.user);
  const { suser, loading, error } = useSelector((state) => state.suser);
  const {
    error: postError,
    posts,
    loading: postloading,
  } = useSelector((state) => state.spost);
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState(false);
  const [myProfile, setMyprofile] = useState(false);
  const [tfollow, setTfollow] = useState(false);
  const [menu, setMenu] = useState(false);
  const [drop, setDrop] = useState(true);
  const navigate = useNavigate();
  const {
    error: likeError,
    loading: followloding,
    message,
    liked,
  } = useSelector((state) => state.like);
  const params = useParams();
  useEffect(() => {
    dispatch(loadsUser(params.id));
    dispatch(userPost(params.id));
    if (params.id === user._id) setMyprofile(true);
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearError" });
    }
  }, [dispatch, likeError, message, liked, params.id, user._id]);
  useEffect(() => {
    let t = false;
    if (suser) {
      for (let i = 0; i < suser.followers.length; i++) {
        if (suser.followers[i]._id.toString() === user._id.toString()) {
          t = true;
        }
      }
    }
    setTfollow(t);
  }, [suser, dispatch]);
  const handleFollow = async (e) => {
    e.preventDefault();
    await dispatch(follow(params.id));
    dispatch(loadsUser(params.id));
  };
  return (
    <div>
      {loading ? (
        <Loader></Loader>
      ) : (
        <div>
          {suser && (
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
                      src={suser.avatar.url ? suser.avatar.url : ""}
                      className="aimg"
                    ></img>
                    <div>{suser.name}</div>
                  </div>

                  <div className="pid">
                    <div className="dqp">
                      <div>{suser.following.length}</div>
                      <button onClick={() => setFollowing(true)}>
                        Following
                      </button>
                    </div>
                    <div className="dqp">
                      <div>{suser.followers.length}</div>
                      <button onClick={() => setFollowers(true)}>
                        Followers
                      </button>
                    </div>
                    <div className="dqp">
                      <div>{suser.posts.length}</div>
                      <div className="tot">posts</div>
                    </div>
                  </div>
                  <div className={!tfollow ? "dqp" : "lcon"}>
                    {!myProfile && (
                      <button
                        onClick={(e) => handleFollow(e)}
                        disabled={followloding}
                      >
                        {!tfollow ? "follow" : "unfollow"}
                      </button>
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
                  <OverlaySidebar
                    menu={menu}
                    setMenu={setMenu}
                  ></OverlaySidebar>
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
                          isDeletable={false}
                          isAcounnt={false}
                          isHome={false}
                        ></Post>
                      );
                    })}
                </div>
              </div>
              <div className="bthreepcn">
                <div className="iy">
                  <img
                    className="aimg"
                    src={suser.avatar.url ? suser.avatar.url : ""}
                  ></img>
                  <div>{suser.name}</div>
                </div>
                <div>
                  <div className="dqp">
                    <div>{suser.following.length}</div>
                    <button onClick={() => setFollowing(true)}>
                      Following
                    </button>
                  </div>
                  <div className="dqp">
                    <div>{suser.followers.length}</div>
                    <button onClick={() => setFollowers(true)}>
                      Followers
                    </button>
                  </div>
                  <div className="dqp">
                    <div>{suser.posts.length}</div>
                    <div className="tot">posts</div>
                  </div>
                  <div className={!tfollow ? "dqp" : "lcon"}>
                    {!myProfile && (
                      <button
                        onClick={(e) => handleFollow(e)}
                        disabled={followloding}
                      >
                        {!tfollow ? "follow" : "unfollow"}
                      </button>
                    )}
                  </div>
                </div>
                <Dialog open={followers} onClose={() => setFollowers(false)}>
                  <div className="dialogBox">
                    <div>Followers</div>
                    {suser.followers &&
                      suser.followers.length > 0 &&
                      suser.followers.map((like, i) => {
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
                    {suser.following &&
                      suser.following.length > 0 &&
                      suser.following.map((like, i) => {
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
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
