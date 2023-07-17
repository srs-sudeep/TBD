import React, { useContext } from "react";
// import * as components from "../components";
import { DarkModeContext } from "../App";
import * as assets from "../assets";
import "./css/Landing.css";

function Landing() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  console.log(darkMode);
  const na = {};
  const landingtitle = darkMode ? { color: "#fcfcfc" } : na;
  console.log(landingtitle);
  const landingsubtext = darkMode ? { color: "#fcfcfc" } : na;
  const button_tryout = darkMode
    ? {
        color: "#0f0f0f",
        background: "#FCFCFC",
        boxShadow: "0px 2px 24px 0px rgba(252, 252, 252, 0.25)",
      }
    : na;

  return (
    <div className="landingcontainer">
      <div className="landingtext">
        <div className="landingtitle" style={landingtitle}>
          Ultimate <span className="gradientbluegreen">Inventory</span> &{" "}
          <span className="gradientbluegreen">Sales Management</span> Solution
        </div>
        <div className="landingsubtitle">
          <div className="landingsubtext" style={landingsubtext}>
            Say goodbye to spreadsheet headaches and hello to a smarter way of
            running your business.{" "}
          </div>
          <a href="/signup" className="button_tryout" style={button_tryout}>
            Try Out
          </a>
        </div>
      </div>

      <div className="pagess">
        <img src={darkMode ? assets.screens_dark : assets.screens} alt="" />
      </div>
    </div>
  );
}

export default Landing;
