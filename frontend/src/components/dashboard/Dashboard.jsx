import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import Navbar from "../Navbar";
const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("USER ID:", userId);
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/repo/user/${userId}`,
        );
        const data = await response.json();
        console.log("RESPONSE:", data.repositories);
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
        console.log("ALL RESPONSE:", data);
        setSuggestedRepositories(data);
      } catch (err) {
        console.error("Error fetching repositories:", err);
      }
    };
    fetchRepositories();
    suggestedRepositories();
  }, []);

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

  return (
    <>
    <Navbar/>
      <section id="dashboard">
        <aside>
          <h3>Suggested Repositories</h3>
          {suggestedRepositories.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description || "No description available"}</h4>
              </div>
            );
          })}
        </aside>
        <br />
        <main>
          <h3>Your Repositories</h3>
          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {searchResults.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description || "No description available"}</h4>
              </div>
            );
          })}
        </main>
        <br />
        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>
              <p>Tech Conference - Dec15 </p>
            </li>
            <li>
              <p>Developer Meetup - Dec25 </p>
            </li>
            <li>
              <p>React Summit - Jan5 </p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
