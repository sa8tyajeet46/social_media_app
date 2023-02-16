import React from "react";
import { CircularProgress } from "@mui/material";
import "./home.css";
function Loader() {
  return (
    <div className="loading">
      <CircularProgress></CircularProgress>
    </div>
  );
}

export default Loader;
