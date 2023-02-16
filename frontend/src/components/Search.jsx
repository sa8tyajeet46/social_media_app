import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import allUser from "./../actions/allUser";
import { useSelector } from "react-redux";
import User from "./User";
import Sidebar from "./Sidebar";
import OverlaySidebar from "./OverlaySidebar";
import { Menu, Cancel } from "@mui/icons-material";
import { Search as Searchicon } from "@mui/icons-material";
function Search() {
  const [name, setName] = useState("");
  const [menu, setMenu] = useState(false);

  const {
    error: userError,
    users,
    loading,
  } = useSelector((state) => state.allUser);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(allUser(name, 20));
  };

  return (
    <div className="containere">
      <div className="onepcn">
        {menu && (
          <div className="can">
            <div onClick={() => setMenu(false)}>
              <Cancel></Cancel>
            </div>
          </div>
        )}
        {!menu && (
          <div className="menu">
            <Menu onClick={() => setMenu(true)}></Menu>
          </div>
        )}
        <Sidebar></Sidebar>
        {menu && (
          <OverlaySidebar menu={menu} setMenu={setMenu}></OverlaySidebar>
        )}
      </div>
      <div className="stwopcn">
        <form onSubmit={(e) => handleSubmit(e)} className="sform">
          <input
            type="text"
            placeholder="search user name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button type="submit" disabled={loading}>
            {" "}
            <Searchicon></Searchicon>
            Search
          </button>
        </form>
      </div>
      <div className="sthreepcn">
        <div className="putit">Search Results</div>
        {users &&
          users.length > 0 &&
          users.map((e, i) => {
            return (
              <User
                name={e.name}
                id={e._id}
                avatar={e.avatar.url}
                key={i}
              ></User>
            );
          })}
      </div>
    </div>
  );
}

export default Search;
