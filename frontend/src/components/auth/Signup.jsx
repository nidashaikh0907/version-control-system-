import React, { useState } from "react";
import axios from "axios";
import logo from "../../assets/github_logo.png";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useAuth } from "../../authContext";
import { Link } from "react-router-dom";
import "./auth.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await axios.post("http://localhost:3000/signup", {
        email: email,
        password: password,
        username: username,
      });

      localStorage.setItem("token", result.data.token);
      localStorage.setItem("userId", result.data.userId);

      setcurrentUser(result.data.userId);
      setLoading(false);

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Signup failed!");
      setLoading(false);
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="logo" />
        <h3>Sign Up</h3>
        <br /><br />
      </div>

      <div className="signup-form">
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />

        <Button
          variant="contained"
          color="success"
          disabled={loading}
          onClick={handleSignUp}
        >
          {loading ? "Loading..." : "SignUp"}
        </Button>
      </div>
      <br />
      <br />
      <div className="pass-box">
        <p>
          Already have an account? <Link to="/auth">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
