const User = require("../models/users");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    //console.log(req.cookies);
    const { token } = req.cookies;

    const decoded = jwt.verify(token.token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
      return res.status(401).json({
        sucess: false,
        message: "Login to continue",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      sucess: false,
      message: "Login to continue",
    });
  }
};

module.exports = isAuthenticated;
