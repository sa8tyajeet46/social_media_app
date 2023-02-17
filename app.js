const express = require("express");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");
const bodyParser = require("body-parser");

app.use(
  cors({
    credentials: true,
    origin: "https://social-app-a10b8.web.app",
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(postRouter);
app.use(userRouter);
//app.use(express.static(path.join(__dirname, "/frontend/build")));
/*app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});*/
module.exports = app;
