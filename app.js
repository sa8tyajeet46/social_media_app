const express = require("express");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");
const path = require("path");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(postRouter);
app.use(userRouter);
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});
module.exports = app;