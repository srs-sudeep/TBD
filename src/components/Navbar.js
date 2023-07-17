import React from "react";
import "./css/Navbar.css";
import * as assets from "../assets";
import { ReactSVG } from "react-svg";
import { useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

const Navbar = () => {
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
  console.log(location.pathname);
  const default_style = {
    gap: "61rem",
  };
  if (
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/signin" ||
    location.pathname === "/companydetails"
  ) {
    return (
      <div className="navbar">
        <div className="navbarcontainer">
          <div className="navbar_left">
            <a href="/error" className="title">SoreTrek</a>
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
            <a href="/error" className="title">SoreTrek</a>
          </div>
          <div className="navbar_right">
            <img src={assets.avatar} alt="userimg" />
            <div className="greeting">Hey {inventoryData.map((item) => (item.companyOwner))}</div>
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
