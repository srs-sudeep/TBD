import React from "react";
import { Link } from "react-router-dom";
import "./css/Sidebar.css";
import * as assets from "../assets";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { DarkModeContext } from "../App";
import { useContext } from "react";

const Sidebar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const na = {};
  const sidebarbox = darkMode
    ? {
        background:
          "linear-gradient(106deg, rgba(69, 160, 245, 0.02) 0%, rgba(38, 227, 194, 0.46) 100%)",
        boxShadow: "-4px 4px 26px 0px rgba(255, 255, 255, 0.25) inset",
      }
    : na;
  const color = darkMode
    ? {
        color: "var(--light, #FCFCFC)",
        fontWeight: "700",
      }
    : na;

  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="sidebarcontainer">
      <div className="sidebarbox" style={sidebarbox}>
        <div className="sidetabs" style={color}>
          <ul>
            <Link to="/home">
              <li>
                <img src={assets.dasboard} alt="dashboardicon" />
                Dashboard
              </li>
            </Link>
            <Link to="/inventory">
              <li>
                {" "}
                <img src={assets.Box_open} alt="inventoryicon" />
                Inventory
              </li>
            </Link>
            <Link to="/sale">
              <li>
                {" "}
                <img src={assets.Money} alt="salesicon" />
                Sales
              </li>
            </Link>
            <Link to="/purchase">
              <li>
                {" "}
                <img src={assets.Bag} alt="purchaseicon" />
                Purchases
              </li>
            </Link>
            <Link to="/profile">
              <li>
                {" "}
                <img src={assets.Group} alt="groupicon" />
                Profile
              </li>
            </Link>
            <button onClick={handleLogout}>
              <li>
                {" "}
                <img src={assets.Sign_out_squre} alt="groupicon" />
                Logout
              </li>
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
