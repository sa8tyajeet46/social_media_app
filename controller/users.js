const User = require("../models/users");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Posts = require("../models/posts");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;
const createUser = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(500).json({
        sucess: false,
        message: "name must be longer",
      });
    }
    if (!req.body.email) {
      return res.status(500).json({
        sucess: false,
        message: "please Enter Email",
      });
    }
    if (Number(req.body.password.length) < 8) {
      //  console.log("t");
      return res.status(500).json({
        sucess: false,
        message: "password must be longer than 8 characters",
      });
    }

    const re = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "SM_AVATAR",
    });
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar: {
        public_id: re.public_id,
        url: re.secure_url,
      },
    };

    const user = await User.findOne({ email: userData.email });
    if (user) {
      res.status(400).json({
        sucess: false,
        message: "user already exists",
      });
    } else {
      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: 20 * 60,
      });
      await sendEmail({
        email: req.body.email,
        subject: "confirmationToken",
        message: `<div><h1>click on the link to verify your accout</h1></br><p>${process.env.HOST}confirm/signUp/${token}</p>
        <p>Discard if not u</p></div>`,
      });
      // const newUser = await User.create(userData);

      res.status(201).json({
        sucess: true,
        message: "check ur mail",
      });
    }
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "internal server error",
    });
  }
};

const verifyUser = async (req, res) => {
  const { token } = req.params;
  try {
    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    const existingUser = await User.findOne({ email: decodedData.email });
    if (existingUser) {
      return res.status(400).json({
        sucess: false,
        message: "user already exists",
      });
    }
    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: "none",
      secure: true,
    };
    const newUser = await User.create(decodedData);
    const t = await newUser.generateToken();
    res.status(201).cookie("token", { token: t }, options).json({
      sucess: true,
      token: t,
      user: newUser,
    });
  } catch (error) {
    //console.log(error);
    res.status(201).json({
      sucess: false,
      user: "wrong token or token expired",
    });
  }
};

const login = async (req, res, next) => {
  try {
    const loginData = req.body;
    const user = await User.findOne({ email: loginData.email })
      .select("+password")
      .populate("followers following posts");
    if (!user) {
      return res.status(400).json({
        sucess: false,
        message: "user doesn't exists",
      });
    }
    const isMatched = await user.isMatchedP(loginData.password);
    if (!isMatched) {
      return res.status(400).json({
        sucess: false,
        message: "Wrong email or password",
      });
    }
    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: "none",
      secure: true,
    };
    const token = await user.generateToken();
    res.status(200).cookie("token", { token }, options).json({
      sucess: true,
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      err: error,
    });
  }
};
const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({
      sucess: true,
      message: "Logout sucessfully",
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      err: error,
    });
  }
};

const followUnfollowUser = async (req, res, next) => {
  try {
    const follower = await User.findOne({ _id: req.user._id });
    const following = await User.findOne({ _id: req.params.id });

    if (!following) {
      return res.status(404).json({
        sucess: false,
        message: "user not found",
      });
    }

    if (following.followers.includes(follower._id)) {
      const followerIndex = following.followers.indexOf(follower._id);
      const followingIndex = follower.following.indexOf(following._id);

      following.followers.splice(followerIndex, 1);
      follower.following.splice(followingIndex, 1);

      await follower.save();
      await following.save();

      return res.status(200).json({
        sucess: true,
        message: "unfollowed sucessfully",
      });
    } else {
      following.followers.push(follower._id);
      follower.following.push(following._id);

      await follower.save();
      await following.save();

      return res.status(200).json({
        sucess: true,
        message: "followed sucessfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      sucess: false,
      err: error.message,
    });
  }
};

const viewProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "posts followers following"
    );

    return res.status(200).json({
      sucess: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      err: error.message,
    });
  }
};

const viewOtherProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "posts followers following"
    );

    return res.status(200).json({
      sucess: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      err: error,
    });
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, avatar } = req.body;

    if (name) {
      user.name = name;
    }
    if (avatar) {
      if (user.avatar && user.avatar.url != "") {
        await cloudinary.uploader.destroy(user.avatar.public_id);
      }
      const re = await cloudinary.uploader.upload(avatar, {
        folder: "SM_AVATAR",
      });
      user.avatar.url = re.secure_url;
      user.avatar.public_id = re.public_id;
    }
    await user.save();

    return res.status(200).json({
      sucess: true,
      message: "profile edited successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: "Internal server error",
    });
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    if (confirmNewPassword !== newPassword) {
      return res.status(400).json({
        sucess: false,
        message: "confirmation Password must be same as New Password",
      });
    }
    const user = await User.findById(req.user._id).select("+password");

    const isMatched = await user.isMatchedP(oldPassword);
    console.log(isMatched);
    if (!isMatched) {
      return res.status(401).json({
        sucess: false,
        message: "Incorrect password",
      });
    }
    user.password = newPassword;

    await user.save();
    return res.status(200).json({
      sucess: true,
      message: "password updated sucessfully",
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    await cloudinary.uploader.destroy(user.avatar.public_id);
    const posts = user.posts;

    for (let i = 0; i < posts.length; i++) {
      const op = await Posts.findOne({ _id: posts[i] });
      op.image && (await cloudinary.uploader.destroy(op.image.public_id));
      await op.delete();
    }

    for (let i = 0; i < user.followers.length; i++) {
      const tuser = await User.findById(user.followers[i]);
      const kIndex = tuser.following.indexOf(req.user._id);
      tuser.following.splice(kIndex, 1);
      await tuser.save();
    }

    for (let i = 0; i < user.following.length; i++) {
      const tuser = await User.findById(user.following[i]);
      const kIndex = tuser.followers.indexOf(req.user._id);
      tuser.followers.splice(kIndex, 1);
      await tuser.save();
    }

    const allPost = await Posts.find();

    for (let i = 0; i < allPost.length; i++) {
      let p = await Posts.findById(allPost[i]._id);
      for (let j = 0; j < p.likes.length; j++) {
        if (p.likes[j].toString() === req.user._id.toString()) {
          p.likes.splice(j, 1);
        }
        // console.log(p.likes[j]);
      }
      await p.save();
    }
    for (let i = 0; i < allPost.length; i++) {
      let p = await Posts.findById(allPost[i]._id);
      for (let j = 0; j < p.comments.length; j++) {
        if (p.comments[j].user.toString() === req.user._id.toString()) {
          p.comments.splice(j, 1);
        }
        console.log(p.comments[j]);
      }
      await p.save();
    }
    await user.delete();

    return res
      .status(200)
      .cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: true,
        sameSite: "none",
      })
      .json({
        sucess: true,
        message: "user deleted sucessfully",
      });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      err: error.message,
    });
  }
};
const forgotPasswordToken = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        sucess: false,
        message: "user not exists",
      });
    }

    const token = await user.generatefgToken();

    await user.save();
    try {
      await sendEmail({
        email: req.body.email,
        subject: "Password reset Token",
        message: `<div><h1>click on the link to verify your accout</h1></br><p>${process.env.HOST}password/reset/${token}</p>
      <p>Discard if not u</p></div>`,
      });
    } catch (error) {
      user.resetPasswordExpire = undefined;
      user.resetPasswordToken = undefined;
      await user.save();
      return res.status(400).json({
        sucess: false,
        message: error,
      });
    }

    res.status(200).json({
      sucess: true,
      message: "mail sent sucessfully",
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: error,
    });
  }
};
const resetPassword = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedPassword = crypto.createHash("sha256", id).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: updatedPassword,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });
    if (!user) {
      return res.status(404).json({
        sucess: false,
        message: "user not found",
      });
    }

    user.password = req.body.password;
    await user.save();
    res.status(200).json({
      sucess: true,
      message: "password updated sucessfully",
    });
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      err: error.message,
    });
  }
};

const giveAllUser = async (req, res, next) => {
  try {
    const data = await User.find({
      name: { $regex: req.query.name, $options: "i" },
    }).limit(req.query.limit);

    for (let i = 0; i < data.length; i++) {
      if (data[i]._id.toString() === req.user._id.toString()) {
        data.splice(i, 1);
      }
    }
    res.status(200).json({
      sucess: true,
      users: data,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: error,
    });
  }
};
module.exports = {
  createUser,
  verifyUser,
  login,
  logout,
  followUnfollowUser,
  viewProfile,
  updateProfile,
  updatePassword,
  giveAllUser,
  deleteUser,
  forgotPasswordToken,
  resetPassword,
  viewOtherProfile,
};
