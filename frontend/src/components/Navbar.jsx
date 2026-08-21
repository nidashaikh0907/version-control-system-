import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/github_logo.png";
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <div>
           <img className="logo" src={logo} alt="logo" />
          <h3>Github</h3>
        </div>
      </Link>
      <div>
        <Link to="/create">
          <p>Create a Repository</p>
        </Link>
        <Link to="/profile">
          <p>Profile</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
