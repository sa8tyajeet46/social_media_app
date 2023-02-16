import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./home.css";
import {
  HomeOutlined,
  Person2Outlined,
  ImageOutlined,
  SearchOutlined,
  Home as Homefilled,
  Person,
  Image,
  Search,
  Add,
  AddOutlined,
} from "@mui/icons-material";
function OverlaySidebar(menu, setMenu) {
  const location = useLocation();
  return (
    <div className="oil">
      <Link to="/">
        <div className="banner">Cupid</div>
      </Link>
      <div className={location.pathname === "/" ? "dpt" : "opt"}>
        {location.pathname === "/" ? (
          <Homefilled></Homefilled>
        ) : (
          <HomeOutlined></HomeOutlined>
        )}
        <Link to="/">Home</Link>
      </div>
      <div className={location.pathname === "/account/me" ? "dpt" : "opt"}>
        {location.pathname === "/account/me" ? (
          <Person></Person>
        ) : (
          <Person2Outlined></Person2Outlined>
        )}
        <Link to="/account/me">account</Link>
      </div>
      <div className={location.pathname === "/create/Post" ? "dpt" : "opt"}>
        {location.pathname === "/create/Post" ? (
          <Add></Add>
        ) : (
          <AddOutlined></AddOutlined>
        )}
        <Link to="/create/Post">Add Post</Link>
      </div>
      <div className={location.pathname === "/search" ? "dpt" : "opt"}>
        {location.pathname === "/search" ? (
          <Search></Search>
        ) : (
          <SearchOutlined></SearchOutlined>
        )}
        <Link to="/search">Search</Link>
      </div>
    </div>
  );
}

export default OverlaySidebar;
