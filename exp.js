/*const { sendEmail } = require("./utils/sendEmail");
const jwt = require("jsonwebtoken");
const obj = {
  email: "satyajeettripathy677@gmail.com",
  subject: "token",
  message: "hi",
};
// const p = async () => {
//   try {
//     await sendEmail({ ...obj });
//     console.log("t");
//   } catch (error) {
//     console.log(error);
//   }
// };
//p();
const token = jwt.sign({ obj }, process.env.JWT_SECRET, { expiresIn: 20 * 60 });

try {
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedData);
} catch (error) {
  console.log("wrong token");
}
*/
const crypto = require("crypto");

const token = crypto.randomBytes(20).toString("hex");

const dtoken = crypto.createHash("sha256", token).digest("hex");

const v = crypto.Has;
console.log(dtoken);
