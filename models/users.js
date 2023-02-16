const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
  },
  password: {
    type: String,
    select: false,
    minLength: [8, "password must be greater than 8 characters"],
    required: [true, "please enter your password"],
  },
  avatar: {
    type: {
      public_id: String,
      url: String,
    },
  },
  followers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
  ],
  following: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
  ],
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Posts",
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.methods.isMatchedP = async function (password) {
  return bcrypt.compare(password, this.password);
};
userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET);
  return token;
};
userSchema.methods.generatefgToken = async function () {
  const token = crypto.randomBytes(20).toString("hex");

  const dtoken = crypto.createHash("sha256", token).digest("hex");
  this.resetPasswordToken = dtoken;
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return token;
};
module.exports = mongoose.model("Users", userSchema);
