import React, { useEffect, useState } from "react";
import Navbar from "../Navbar.jsx";
import "../Navbar.css";
import "./Profile.css";
import profile from "../../assets/image.png";
import Button from "@mui/material/Button";
import axios from "axios";
import HeatMapProfile from "./HeatMap.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";

const Profile = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const [userDetails, setUserDetails] = useState({});
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        return;
      }

      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/userprofile/${userId}`,
        );

        setUserDetails(response.data);
      } catch (error) {
        console.error("Cannot fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, []);


  useEffect(() => {
    const fetchRepositories = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/repo/user/${userId}`,
        );
        setRepositories(response.data.repositories || []);
      } catch (error) {
        console.error("Cannot fetch repositories:", error);
      }
    };

    fetchRepositories();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setCurrentUser(null);

    window.location.href = "/auth";
  };

  return (
    <>
      <Navbar />

      <br />
      <br />

      <hr />

      <br />

   
      <div className="profile-option">
        <h3>
          <i className="fa-solid fa-book-open"></i>  
          &nbsp; Overview
        </h3>

        <h3 onClick={() => navigate("/starred")}>
          <i className="fa-solid fa-book-bookmark"></i>
          &nbsp; Starred Repositories
        </h3>

        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <br />

      <hr />

      <br />

      <div className="profile-container">

        {/* Section 1: User Profile */}
        <div className="profile-icon">
          <img src={profile} alt="profile" />

          <h3>{userDetails.username}</h3><br/>
          <Button variant="contained">
            Follow
          </Button>
          <p>10 Follower</p>
          <p>3 Following</p>
        </div>

        {/* Section 2: Repositories */}
        <div className="all-repo">
          <h3>Repositories</h3>

          <div className="repo-list">
            {repositories.length > 0 ? (
              repositories.map((repo) => (
                <div
                  key={repo._id}
                  className="repo-item"
                  onClick={() => navigate(`/repo/${repo._id}`)}
                >
                  <h4>
                    <i className="fa-solid fa-book"></i>
                    &nbsp;
                    {repo.name}
                  </h4>

                  <p>
                    {repo.description || "No description available"}
                  </p>

                  <span>
                    {repo.visibility ? "Public" : "Private"}
                  </span>
                </div>
              ))
            ) : (
              <p>No repositories found.</p>
            )}
          </div>
        </div>

        <div className="heat-map-section">
          <HeatMapProfile />
        </div>

      </div>
    </>
  );
};

export default Profile;