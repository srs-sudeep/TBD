import React from "react";
import "./css/Background.css";
import { DarkModeContext } from "../App";
import { useContext } from "react";

const Background = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const na = {};
  const background = darkMode
    ? {
        backgroundColor: "#0f0f0f",
      }
    : na;

  return (
    <div className="background" style={background}>
      <div className="backlight blue one"></div>
      <div className="backlight green two"></div>
      <div className="backlight blue three"></div>
    </div>
  );
};

export default Background;
