import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../authContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./auth.css";
import axios from "axios";
import logo from "../../assets/github_logo.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();

  const handleLogin = async (e) => {
    //establish signup endpoint
    e.preventDefault();
    try {
      setLoading(true);
      const result = await axios.post("http://localhost:3000/login", {
        email: Email,
        password: password,
      });

      localStorage.setItem("token", result.data.token);
      localStorage.setItem("userId", result.data.userId);

      setCurrentUser(result.data.userId);
      setLoading(false);

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Login failed!");
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo" src={logo} alt="logo" />
        <br />
        <h1>Login</h1>
      </div>
      <br />
      <br />
      <div className="signup-form">
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            "& input": {
              color: "white",
              WebkitTextFillColor: "white",
            },
            "& label": {
              color: "white",
            },
            "& fieldset": {
              borderColor: "white",
            },
          }}
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            "& input": {
              color: "white",
              WebkitTextFillColor: "white",
            },
            "& label": {
              color: "white",
            },
            "& fieldset": {
              borderColor: "white",
            },
          }}
        />
        <br />
        <br />
        <Button
          variant="contained"
          color="success"
          disabled={loading}
          onClick={handleLogin}
           sx={{
            backgroundColor: "#238636",
            color: "white",

            "&:hover": {
              backgroundColor: "#2ea043",
            },

            "&.Mui-disabled": {
              backgroundColor: "#238636",
              color: "white",
              opacity: 1,
            },
          }}
        >
          {loading ? "loading..." : "login"}
        </Button>
      </div>
      <br />
      <br />
      <p className="pass-box">
        New to GitHub? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  );
};

export default Login;
