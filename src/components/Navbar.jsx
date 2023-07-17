import React from "react";
import "./css/Navbar.css";
import * as assets from "../assets";
import { ReactSVG } from "react-svg";
import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  console.log(location.pathname);
  if (location.pathname === "/") {
    return (
      <div className="navbar">
        <div className="navbarcontainer">
          <div className="navbar_left">
            <div className="title">SoreTrek</div>
          </div>
          <div className="navbar_center">
            <div className="navbarlink">Templates</div>
            <div className="navbarlink">Solutions</div>
            <div className="navbarlink">Pricing</div>
          </div>
          <div className="navbar_right">
            <ReactSVG src={assets.darkModeIcon} />
            <div className="button_tryfree">Try Free</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar">
        <div className="navbarcontainer">
          <div className="navbar_left">
            <div className="title">SoreTrek</div>
          </div>
          <div className="navbar_right">
            <img src={assets.userimg} alt="userimg" />
            <div className="button_tryfree">Try Free</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
