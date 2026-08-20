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
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();

  const handleSignUp = async (e) => {
    //establish signup endpoint
    e.preventDefault();
    console.error("HANDLE SIGNUP CALLED");
    try {
      setLoading(true);
      const result = await axios.post("http://localhost:3000/signup", {
        email: email,
        password: password,
        username: username,
      });

      console.error(" BACKEND RESULT:", result.data);

      localStorage.setItem("token", result.data.token);
      localStorage.setItem("userId", result.data.userId);
      console.log("token saved:", localStorage.getItem("token"));
      console.log("user Id saved:", localStorage.getItem("userId"));

      setCurrentUser(result.data.userId);
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
        <img className="logo" src={logo} alt="logo" />
        <br />
        <h3>Sign Up</h3>
        <br />
        <br />
      </div>

      <div className="signup-form">
        <TextField
          className="input-form"
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
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
          className="input-form"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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
          className="input-form"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
          onClick={handleSignUp}
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
          {loading ? "Loading..." : "SignUp"}
        </Button>
      </div>
      <br />
      <br />
      <div className="pass-box">
        <p>
          Already have an account? <Link to="/auth">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
