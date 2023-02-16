import axios from "axios";

const instance = axios.create({
  baseURL: "https://cupid-social-media-app.onrender.com",
  withCredentials: true,
});

export default instance;
