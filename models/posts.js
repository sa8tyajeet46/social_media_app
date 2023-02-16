const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
  },
  image: {
    type: {
      public_id: String,
      url: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  comments: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
      },
      comment: {
        type: String,
        required: [true, "please enter a comment"],
      },
    },
  ],
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
  ],
});
module.exports = mongoose.model("Posts", postSchema);
