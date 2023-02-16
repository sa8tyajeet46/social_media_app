const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const connenctDatabase = () => {
  mongoose
    .connect(process.env.MONGODBURI)
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => console.log(err));
};
module.exports = connenctDatabase;
