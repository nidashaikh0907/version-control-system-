import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/github_logo.png";
import "./Navbar.css"
import avtar from "../assets/avtar.png"

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <div className="logo-container">
           <img className="logo" src={logo} alt="logo" />
          <h3>Github</h3>
        </div>
        
      </Link>
      <div className="navbar-option">
        <Link to="/create">
          <p>Create a Repository</p>
        </Link>
        <Link to="/profile">
          <img className="avtar" src={avtar}/>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
