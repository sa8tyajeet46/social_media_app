import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import like from "../actions/like";
import loadPost from "../actions/loadPost";
import { Dialog } from "@mui/material";
import "./post.css";
import User from "./User";
import commentPost from "./../actions/commentPost";
import CommentHolder from "./CommentHolder";
import loadmyPost from "./../actions/mypost";
import deletePost from "./../actions/deletePost";
import loadUser from "./../actions/loadUser";
import editCaption from "./../actions/editCaption";
import { useParams } from "react-router-dom";
import loadsUser from "../actions/loadSuser";
import userPost from "./../actions/userPost";
import { format } from "date-fns";
import { Send } from "@mui/icons-material";
import {
  FavoriteOutlined,
  FavoriteBorderOutlined,
  ModeCommentOutlined,
  Delete,
  Edit,
} from "@mui/icons-material";
function Post({
  postId,
  caption,
  imageUrl = "",
  createdAt,
  userName,
  userAvatar = "",
  userId,
  likes,
  likeA,
  comments,
  isDeletable = false,
  isAcounnt = false,
  isHome,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.like);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const {
    error: postError,
    posts,
    loading: postloading,
  } = useSelector((state) => state.spost);
  useEffect(() => {
    let t = false;
    for (let i = 0; i < likeA.length; i++) {
      if (likeA[i]._id.toString() === user._id.toString()) {
        t = true;
      }
    }
    setLiked(t);
  }, [liked, posts]);
  const params = useParams();
  const [ecaption, setEcaption] = useState(caption);
  const [edit, setEdit] = useState(false);
  const [likeUser, setLikeUser] = useState(false);
  const [commented, setCommented] = useState(false);
  const handleLike = async (e) => {
    // setLiked(!liked);
    e.preventDefault();
    await dispatch(like(postId));
    if (isAcounnt) {
      dispatch(loadmyPost());
    } else {
      if (isHome) dispatch(loadPost());
      else {
        //console.log(params.id);
        dispatch(userPost(params.id));
      }
    }
  };
  const handleComment = async (e) => {
    e.preventDefault();
    await dispatch(commentPost(postId, commentText));
    if (isAcounnt) {
      dispatch(loadmyPost());
    } else {
      if (isHome) dispatch(loadPost());
      else dispatch(userPost(params.id));
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    const box = window.confirm("Are you sure to delete this post");
    if (!box) {
      return;
    }
    await dispatch(deletePost(postId));
    dispatch(loadmyPost());
    dispatch(loadUser());
  };
  const handleEditCaption = async (e) => {
    e.preventDefault();
    await dispatch(editCaption(postId, ecaption));
    dispatch(loadmyPost());
    dispatch(loadUser());
  };
  let date = new Date(createdAt);
  //console.log(date);
  let time = date.getTime();
  //console.log(time);
  return (
    <div className="pmain">
      <div className="psub">
        <div className="ucon">
          <Link to={`/user/${userId}`}>
            <img src={userAvatar} className="uimg"></img>
          </Link>
          <div className="psubcon">
            <div className="name">{userName}</div>
            <div className="dt">
              {format(date, "dd MMM yy")} {format(time, "K:m aaa")}
            </div>
          </div>
        </div>
        <div className="pcap">{caption}</div>
        <img src={imageUrl} className="pimg"></img>
        <div className="pq">
          <button onClick={() => setLikeUser(true)} className="btn1">
            {likes}
            <FavoriteBorderOutlined className="heart"></FavoriteBorderOutlined>
          </button>

          <button onClick={() => setCommented(true)}>
            {`${comments.length}`}
            <ModeCommentOutlined className="heart"></ModeCommentOutlined>
          </button>
          {liked ? (
            <button onClick={(e) => handleLike(e)}>
              <FavoriteOutlined className="pheart"></FavoriteOutlined>
            </button>
          ) : (
            <button onClick={(e) => handleLike(e)}>
              <FavoriteBorderOutlined className="heart"></FavoriteBorderOutlined>
            </button>
          )}
        </div>
        <div className="pp">
          {isDeletable && (
            <button onClick={(e) => handleDelete(e)} disabled={loading}>
              <Delete></Delete>
              Delete
            </button>
          )}
          {isAcounnt && (
            <button onClick={() => setEdit(true)}>
              <Edit></Edit>Edit
            </button>
          )}
        </div>

        <Dialog open={likeUser} onClose={() => setLikeUser(false)}>
          <div className="dialogBox">
            <div>Liked Users</div>
            {likeA.map((like, i) => {
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
        <Dialog open={edit} onClose={() => setEdit(false)}>
          <div className="dialogBox">
            <form onSubmit={(e) => handleEditCaption(e)}>
              <input
                type="text"
                value={ecaption}
                onChange={(e) => setEcaption(e.target.value)}
              ></input>
              <button type="submit">Edit comment</button>
            </form>
          </div>
        </Dialog>
        <Dialog open={commented} onClose={() => setCommented(false)}>
          <div className="dialogBox">
            <form onSubmit={(e) => handleComment(e)} className="commentForm">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add comment"
              ></input>
              <button type="submit">
                <Send></Send>
              </button>
            </form>
            {comments &&
              comments.length > 0 &&
              comments.map((comment, i) => {
                return (
                  <CommentHolder
                    key={i}
                    isAccount={isAcounnt}
                    postId={postId}
                    userId={comment.user._id}
                    userName={comment.user.name}
                    commentId={comment._id}
                    userAvatar={comment.user.avatar.url}
                    comment={comment.comment}
                  ></CommentHolder>
                );
              })}
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default Post;
