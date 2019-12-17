import React from "react";
import "./style.scss";

function Footer() {
  return (
    <div className="footer">
      <i
        className="fab fa-facebook"
        onClick={() => {
          window.location.href = "https://facebook.com";
        }}
      ></i>
      <i
        className="fab fa-twitter"
        onClick={() => {
          window.location.href = "https://twitter.com";
        }}
      ></i>
      <i
        className="fab fa-instagram"
        onClick={() => {
          window.location.href = "https://instagram.com";
        }}
      ></i>
      <p className="footer__content">
        Copyright Bloodbath<sup>TM</sup> Corporation
      </p>
    </div>
  );
}

export default Footer;
