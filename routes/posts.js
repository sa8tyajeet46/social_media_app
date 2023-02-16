const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");

const {
  createPost,
  likeandunlikepost,
  deletePost,
  viewPost,
  addComment,
  deleteComment,
  deleteSelectedComment,
  viewMyPost,
  editPost,
  viewUserPost,
} = require("../controller/posts");
const postRouter = express.Router();

postRouter.route("/posts/upload").post(isAuthenticated, createPost);
postRouter
  .route("/posts/likedislike/:id")
  .get(isAuthenticated, likeandunlikepost)
  .delete(isAuthenticated, deletePost);
postRouter.route("/posts/view").get(isAuthenticated, viewPost);
postRouter.route("/posts/view/me").get(isAuthenticated, viewMyPost);
postRouter.route("/posts/comment/:id").put(isAuthenticated, addComment);
postRouter.route("/posts/comment/:id").delete(isAuthenticated, deleteComment);
postRouter.route("/posts/user/:id").get(isAuthenticated, viewUserPost);
postRouter.route("/posts/edit/:id").post(isAuthenticated, editPost);
postRouter
  .route("/posts/dcomment/:cid/:pid")
  .delete(isAuthenticated, deleteSelectedComment);
module.exports = postRouter;
