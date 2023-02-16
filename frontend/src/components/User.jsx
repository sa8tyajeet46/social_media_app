import React from "react";
import { Link } from "react-router-dom";
import "./user.css";
function User({ name, avatar = "", id }) {
  return (
    <div className="profileTab">
      <div className="kku">
        <img src={avatar} className="profileImg"></img>

        <div className="profileName">{name}</div>
      </div>
      <Link to={`/user/${id}`} className="viewTab">
        view
      </Link>
    </div>
  );
}

export default User;
