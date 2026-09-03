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
    const fetchRepositories = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) return;

      try {
        const response = await fetch(
          `http://localhost:3000/repo/user/${userId}`
        );

        const data = await response.json();

        if (response.ok) {
          setRepositories(data.repositories || []);
        }
      } catch (err) {
        console.error("Error fetching repositories:", err);
      }
    };

    fetchRepositories();
  }, []);


  useEffect(() => {
    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/repo/all"
        );

        const data = await response.json();

        setSuggestedRepositories(data || []);
      } catch (err) {
        console.error("Error fetching repositories:", err);
      }
    };

    fetchSuggestedRepositories();
  }, []);


  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) return;

      try {
        const response = await axios.put(
          `http://localhost:3000/userprofile/${userId}`
        );

        setUserDetails(response.data);
      } catch (err) {
        console.error("Cannot fetch user details:", err);
      }
    };

    fetchUserDetails();
  }, []);


  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );

      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);



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
        }
      );

      alert("Repository starred successfully!");
    } catch (error) {
      console.error("Error starring repository:", error);

      alert("Could not star repository");
    }
  };



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

      <section id="dashboard">


        <main className="left-side">

          <div className="username">

            <img
              src={profile}
              className="username-avatar"
              alt="profile"
            />

            <h4>{userDetails.username}</h4>

          </div>

          <h3 className="section-title">
            Recent
          </h3>

          {/* SEARCH */}

          <div id="search">

            <Search>

              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>

              <StyledInputBase
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
              />

            </Search>

          </div>


          <div className="recent-repositories">

            {searchResults.length > 0 ? (

              searchResults.map((repo) => (

                <div
                  key={repo._id}
                  className="recent_repo"
                  onClick={() =>
                    navigate(`/repo/${repo._id}`)
                  }
                >

                  <img
                    src={profile}
                    className="repo-avatar"
                    alt="repository"
                  />

                  <h4>{repo.name}</h4>

                </div>

              ))

            ) : (

              <p className="no-repo">
                No repositories found.
              </p>

            )}

          </div>

        </main>


        <aside className="home-section">

          <h3>Home</h3>

          <div className="home-repositories">

            {suggestedRepositories.length > 0 ? (

              suggestedRepositories.map((repo) => (

                <div
                  key={repo._id}
                  className="home-content"
                >

                  <div id="repo-name">

                    <h4>{repo.name}</h4>

                    <button
                      className="star-button"
                      onClick={() =>
                        handleStar(repo._id)
                      }
                    >
                      ⭐
                    </button>

                  </div>

                  <h5>
                    {repo.description ||
                      "No description available"}
                  </h5>

                  <button
                    onClick={() =>
                      navigate(`/repo/${repo._id}`)
                    }
                    className="visit-button"
                  >
                    Visit
                  </button>

                </div>

              ))

            ) : (

              <p>No repositories available.</p>

            )}

          </div>

        </aside>


        <aside className="right-side">

          <h3>Upcoming Events</h3>

          <ul>

            {upcomingEvents.map((event, index) => (

              <li key={index}>

                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >

                  <h4>{event.title}</h4>

                  <p>{event.date}</p>

                  <small>
                    {event.description}
                  </small>

                  <button>
                    Visit
                  </button>

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