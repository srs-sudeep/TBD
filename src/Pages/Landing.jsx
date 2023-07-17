import React from "react";
// import * as components from "../components";
import * as assets from "../assets";
import "./css/Landing.css";

function Landing() {
  return (
    <div className="landingcontainer">
      <div className="landingtext">
        <div className="landingtitle">
          Ultimate <span className="gradientbluegreen">Inventory</span> &{" "}
          <span className="gradientbluegreen">Sales Management</span> Solution
        </div>
        <div className="landingsubtitle">
        <div className="landingsubtext">
          Say goodbye to spreadsheet headaches and hello to a smarter way of
          running your business.{" "}
        </div>
        <div className="button_tryout">Try Out</div>
        </div>
      </div>
      
      <div className="pagess"><img src={assets.screens} alt="" /></div>
    </div>
  );
}

export default Landing;
