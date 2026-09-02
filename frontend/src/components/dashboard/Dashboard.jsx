import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import Navbar from "../Navbar";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import profile from "../../assets/image.png";
import { useAuth } from "../../authContext";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Dashboard = () => {
  const { currentUser, setCurrentUser, username, setUsername } = useAuth();
  const navigate = useNavigate();
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    width: "100%",
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      width: "100%",
    },
  }));

  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/repo/user/${userId}`,
        );
        const data = await response.json();
        if (response.ok) {
          setRepositories(data.repositories);
        }
      } catch (err) {
        console.error("Error fetching repositories:", err);
      }
    };

    const suggestedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3000/repo/all`);
        const data = await response.json();
        setSuggestedRepositories(data);
      } catch (err) {
        console.error("Error fetching repositories:", err);
      }
    };
    fetchRepositories();
    suggestedRepositories();
  }, []);

  const handleStar = async (repoId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3000/repo/${repoId}/star`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Repository starred successfully!");
    } catch (error) {
      console.error("Error starring repository:", error);
      alert("Could not star repository");
    }
  };

  useEffect(() => {
    if (searchQuery == "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

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

  const upcomingEvents = [
    {
      title: "Dev Days | Pune",
      date: "Sep 5, 2026",
      description:
        "A developer-focused event featuring talks, workshops, and networking.",
      link: "https://www.meetup.com/pune-tech-community/events/316150163/",
    },
    {
      title: "Community Hackathon",
      date: "Sep 5, 2026",
      description:
        "A hands-on hackathon where developers build projects using modern AI tools.",
      link: "https://developers.openai.com/community/meetups?city=Pune",
    },
    {
      title: "iQOO Hackathon 2026",
      date: "Sep 5-6, 2026",
      description:
        "A competitive hackathon for building innovative technology solutions.",
      link: "https://iqoo.reskilll.com/",
    },
    {
      title: "AI Tinkerers × Michelin Hackathon",
      date: "Sep 6, 2026",
      description:
        "An engineering-focused hackathon centered around AI and practical problem solving.",
      link: "https://pune.aitinkerers.org/p/ai-tinkerers-x-michelin-pune-harness-engineering-hackathon",
    },
    {
      title: "GALXE CODE 2026",
      date: "Sep 7, 2026",
      description:
        "A technical coding and innovation event for developers and students.",
      link: "https://galxecode2026.blogspot.com/",
    },
  ];

  return (
    <>
      <Navbar />
      <br />
      <section id="dashboard">
        <br />
        <main className="left-side">
          <br />
          <br />
          <div className="username">
            <img src={profile} className="profile" />
            &nbsp;&nbsp;&nbsp;
            <h4 style={{ color: "white" }}>{userDetails.username}</h4>
          </div>
          <br />
          <br />
          <br /> <h3>Recent</h3>
          <br />
          <div id="search">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>

              <StyledInputBase
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Search>
          </div>
          <br />
          {searchResults.map((repo) => {
            return (
              <div
                key={repo._id}
                className="recent_repo"
                onClick={() => navigate(`repo/${repo._id}`)}
              >
                <img src={profile} className="profile" />
                <h4>{repo.name}</h4>
                <br />
                <br />
              </div>
            );
          })}
        </main>
        <br />
        <aside className="home-section">
          <b>
            <h3>Home</h3>
          </b>
          <br />
          {suggestedRepositories.map((repo) => {
            return (
              <div key={repo._id} className="home-content">
                <div id="repo-name">
                  <h4>{repo.name}</h4>
                  <button onClick={() => handleStar(repo._id)}>⭐</button>
                </div>
                <h5>{repo.description || "No description available"}</h5>
                <button
                  onClick={() => navigate(`repo/${repo._id}`)}
                  className="visit-button"
                >
                  visit
                </button>
              </div>
            );
          })}
        </aside>
        <aside className="right-side">
          <h3>Upcoming Events</h3>
          <br />

          <ul>
            {upcomingEvents.map((event, index) => (
              <li key={index}>
                <a href={event.link} target="_blank" rel="noopener noreferrer">
                  <h4>{event.title}</h4>
                  <p>{event.date}</p>
                  <br />
                  <small>{event.description}</small>
                  <button>Visit</button>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
