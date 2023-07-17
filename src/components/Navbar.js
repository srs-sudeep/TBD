import React from "react";
import "./css/Navbar.css";
import * as assets from "../assets";
import { ReactSVG } from "react-svg";
import { useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
const Navbar = () => {
  const { user } = UserAuth();

  const location = useLocation();
  console.log(location.pathname);
  const default_style = {
    gap: "61rem",
  };
  if (
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/signin"
  ) {
    return (
      <div className="navbar">
        <div className="navbarcontainer">
          <div className="navbar_left">
            <div className="title">SoreTrek</div>
          </div>
          <div className="navbar_right">
            <ReactSVG src={assets.darkModeIcon} />
            <a href="/signup" className="button_tryfree">
              Try Free
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar">
        <div className="navbarcontainer" style={default_style}>
          <div className="navbar_left">
            <div className="title">SoreTrek</div>
          </div>
          <div className="navbar_right">
            <img src={assets.userimg} alt="userimg" />
            <div className="greeting">Hey {user.email}</div>
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
