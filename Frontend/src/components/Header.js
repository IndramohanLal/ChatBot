import React from "react";
import "./Header.css";
import logo from "../images/logo.png";
import THECB from "../images/THECB.png";
import Gen_Logo from "../images/Gen_Logo.png";
const Header = () => {
  return (
    <header className="header">
      <img src={THECB} />
      <img className="App-logo" src={Gen_Logo} />
    </header>
  );
};

export default Header;
