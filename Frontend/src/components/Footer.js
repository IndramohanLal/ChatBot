import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Demo Chat Portal - Powered by Genzeon.
        All rights reserved. ( No data will be stored )
      </p>
    </footer>
  );
};

export default Footer;
