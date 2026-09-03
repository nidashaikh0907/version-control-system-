import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar.jsx";
import "./StarredRepo.css";

const starredRepo = () => {
  const [starredRepos, setStarredRepos] = useState([]);

  useEffect(() => {
    const fetchStarredRepos = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      // Call your API to fetch starred repositories for the user
      if (userId) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/user/${userId}/starred`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setStarredRepos(response.data);
        } catch (error) {
          console.error("Error fetching starred repositories:", error);
        }
      }
    };
    fetchStarredRepos();
  }, []);

  return (
    <>
      <Navbar />

      <div className="starred-container">
        <h2>⭐Starred Repositories</h2>
        {starredRepos.length > 0 ? (
          starredRepos.map((repo) => (
            <div className="starred-repo" key={repo._id}>
              <div onClick={() => (window.location.href = `/repo/${repo._id}`)}>
                <h3>
                  {" "}
                  <i class="fa-solid fa-book-bookmark"></i> {repo.name}
                </h3>
                <br />
                <div className="repo-details">
                  <p>{repo.description || "No description available"}</p>
                  <small>
                    {repo.visibility ? (
                      <>
                        <i class="fa-solid fa-globe"></i>&nbsp;
                        Public
                      </>
                    ) : (
                      <>
                        <i class="fa-solid fa-lock"></i>
                        Private
                      </>
                    )}
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>You haven't starred any repositories yet.</p>
        )}
      </div>
    </>
  );
};

export default starredRepo;
