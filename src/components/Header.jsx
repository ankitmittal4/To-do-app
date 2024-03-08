import React from "react";
import logo from "../images/logo.png";
const Header = () => {
  return (
    <>
      <div className="header">
        <img
          src={logo}
          alt="logo"
          height="40"
          width="30"
          className="logo-img"
        ></img>
        <h1 className="header-text">Google Keep</h1>
      </div>
    </>
  );
};
export default Header;
