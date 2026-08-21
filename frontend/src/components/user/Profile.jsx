import React, { useEffect, useState } from "react";
import Navbar from "../Navbar.jsx";
import "../Navbar.css";
import "./Profile.css";
import profile from "../../assets/image.png";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await axios.put(
            `http://localhost:3000/userprofile/${userId}`,
          );
          setUserDetails(response.data);
        } catch (err) {
          console.error("Cannot fetch user details", err);
        }
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <>
      <br />
      <Navbar />
      <br />
      <br />
      <hr />
      <br />
      <div className="profile-option">
        <h3>
          <i class="fa-solid fa-book-open"></i>
          Overview
        </h3>
        <h3>
          <i class="fa-solid fa-book-bookmark"></i>
          Starred Repositories
        </h3>
      </div>
      <br />
      <hr />
      <br />
      <div className="profile-icon">
        <br />
        <img src={profile} alt="profile" />
        <br />
        <br />
        <h3>{userDetails.username}</h3>
        <br />
        <Button variant="contained">Primary</Button>
      </div>
      <br />
      <div className="profile-update">
        <p>10 Follower</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <p>3Following</p>
      </div>
      <div className="heat-map-section">
        <HeatMapProfile />
      </div>
    </>
  );
};

export default Profile;
