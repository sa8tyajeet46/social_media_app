import React from "react";
import { useSelector } from "react-redux";
import deleteCommentPost from "./../actions/deleteComment";
import { useDispatch } from "react-redux";
import loadPost from "../actions/loadPost";
import "./post.css";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
function CommentHolder({
  userId,
  userName,
  commentId,
  postId,
  userAvatar = "",
  isAccount = false,
  comment,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteCommentPost(postId));
    if (isAccount) {
    } else {
      dispatch(loadPost());
    }
  };
  return (
    <div className="uil">
      <div className="pil">
        <img src={userAvatar} onClick={() => navigate(`/user/${userId}`)}></img>
        <div>{userName}</div>
      </div>
      <div className="pilu">
        <div>{comment}</div>
        {(isAccount || userId === user._id.toString()) && (
          <button onClick={(e) => handleDelete(e)}>
            <Delete></Delete>
          </button>
        )}
      </div>
    </div>
  );
}

export default CommentHolder;
