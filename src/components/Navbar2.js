import React from "react";
import "./css/Navbar.css";
import * as assets from "../assets";
import { useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { DarkModeContext } from "../App";

const Navbar2 = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [inventoryData, setInventoryData] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    const fetchInventoryData = async () => {
      const ref = collection(db, `tbd-database/${user.uid}/companyDetails`);
      const snapshot = await getDocs(ref);
      const inventoryData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInventoryData(inventoryData);
    };

    fetchInventoryData();
  }, [user.uid]);

  const location = useLocation();
  const na = {};
  const color = darkMode
    ? {
        color: "#fcfcfc",
      }
    : na;
  const button_tryfree = darkMode
    ? {
        border: "2px solid var(--light, #FCFCFC)",
        background: "var(--dark, #0F0F0F)",
        boxShadow: "0px 2px 24px 0px rgba(15, 15, 15, 0.50)",
        color: "var(--light, #FCFCFC)",
      }
    : na;
  const default_style = {
    gap: "61rem",
  };
  return (
    <div className="navbar">
      <div className="navbarcontainer" style={default_style}>
        <div className="navbar_left" style={color}>
          <a href="/error" className="title">
            SoreTrek
          </a>
        </div>
        <div className="navbar_right">
          <img src={assets.avatar} alt="userimg" />
          <div className="greeting" style={color}>
            Hey {inventoryData.map((item) => item.companyOwner)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
