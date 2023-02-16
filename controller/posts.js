const Posts = require("../models/posts");
const User = require("../models/users");
const cloudinary = require("cloudinary").v2;
const createPost = async (req, res) => {
  try {
    const re = await cloudinary.uploader.upload(req.body.image, {
      folder: "SM_POST",
    });
    // console.log(res);
    const postData = {
      caption: req.body.caption,
      image: {
        public_id: re.public_id,
        url: re.secure_url,
      },
      postedBy: req.user._id,
    };

    const newPost = await Posts.create(postData);
    const user = await User.findOne({ _id: req.user._id });
    user.posts.push(newPost._id);
    await user.save();

    res.status(201).json({
      sucess: true,
      message: "posted succesfully",
      post: newPost,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).json({
      sucess: false,
      message: "internal server error",
    });
  }
};
const likeandunlikepost = async (req, res, next) => {
  try {
    //console.log(req.params);
    const post = await Posts.findById(req.params.id);

    if (!post) {
      res.status(404).json({
        sucess: false,
        message: "post not found",
      });
    }

    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);
      await post.save();
      res.status(200).json({
        sucess: true,
        message: "disliked",
      });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      res.status(200).json({
        sucess: true,
        message: "liked",
      });
    }
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      err: error,
    });
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        sucess: false,
        message: "post not found",
      });
    }

    if (post.postedBy.toString() === req.user._id.toString()) {
      const index = req.user.posts.indexOf(post._id);

      const user = await User.findById(req.user._id).populate("posts");
      await cloudinary.uploader.destroy(user.posts[index].image.public_id);
      user.posts.splice(index, 1);

      await user.save();
      await post.delete();
      return res.status(200).json({
        sucess: true,
        message: "Deleted Sucessfully",
      });
    }
    return res.status(401).json({
      sucess: false,
      message: "unauthorized user",
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      err: error,
    });
  }
};

const editPost = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        sucess: false,
        message: "post not found",
      });
    }

    if (post.postedBy.toString() === req.user._id.toString()) {
      post.caption = req.body.caption;
      await post.save();
      return res.status(200).json({
        sucess: true,
        message: "Caption Updated successfully",
      });
    }
    return res.status(401).json({
      sucess: false,
      message: "unauthorized user",
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      err: error,
    });
  }
};

const viewPost = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = await Posts.find({
      postedBy: {
        $in: user.following,
      },
    }).populate("postedBy comments.user likes");
    posts.reverse();

    return res.status(200).json({
      sucess: true,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error,
    });
  }
};

const viewMyPost = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    let posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const k = await Posts.findById(user.posts[i]).populate(
        "likes comments.user postedBy"
      );
      posts.push(k);
    }
    posts.reverse();
    return res.status(200).json({
      sucess: true,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      err: error,
    });
  }
};
const viewUserPost = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    let posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const k = await Posts.findById(user.posts[i]).populate(
        "likes comments.user postedBy"
      );
      posts.push(k);
    }
    return res.status(200).json({
      sucess: true,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      err: error,
    });
  }
};

const addComment = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        sucess: false,
        message: "post not found",
      });
    }

    let commentId = -1;

    post.comments.forEach((item, i) => {
      if (item.user.toString() === req.user._id.toString()) {
        commentId = i;
      }
    });
    if (commentId === -1) {
      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });
      await post.save();
      return res.status(200).json({
        sucess: true,
        message: "comment added successfully",
      });
    } else {
      post.comments[commentId].comment = req.body.comment;
      await post.save();

      return res.status(200).json({
        sucess: true,
        message: "comment updated successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      err: error,
    });
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        sucess: false,
        message: "post not found",
      });
    }

    let commentId = -1;

    post.comments.forEach((item, i) => {
      if (item.user.toString() === req.user._id.toString()) {
        commentId = i;
      }
    });
    if (commentId === -1) {
      return res.status(500).json({
        sucess: false,
        message: "No comment found",
      });
    } else {
      post.comments.splice(commentId, 1);
      await post.save();

      return res.status(200).json({
        sucess: true,
        message: "comment deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      err: error,
    });
  }
};

const deleteSelectedComment = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.pid);
    if (!post) {
      return res.status(404).json({
        sucess: false,
        message: "post not found",
      });
    }
    if (post.postedBy.toString() === req.user._id.toString()) {
      let commentId = -1;

      post.comments.forEach((item, i) => {
        if (item._id.toString() === req.params.cid) {
          commentId = i;
        }
      });
      if (commentId === -1) {
        return res.status(500).json({
          sucess: false,
          message: "No comment found",
        });
      } else {
        post.comments.splice(commentId, 1);
        await post.save();

        return res.status(200).json({
          sucess: true,
          message: "comment deleted successfully",
        });
      }
    } else {
      return res.status(500).json({
        sucess: false,
        message: "you doesn't own the post",
      });
    }
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      err: error,
    });
  }
};
module.exports = {
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
};
