const app = require("./app");
const cloudinary = require("cloudinary").v2;
const connenctDatabase = require("./database");
require("dotenv").config({ path: "./config/config.env" });
connenctDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
app.listen(process.env.PORT, () => {
  console.log(`app is running at ${process.env.PORT}`);
});
