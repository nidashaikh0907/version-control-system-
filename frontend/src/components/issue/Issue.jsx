import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Navbar from "../Navbar.jsx";
import "./Issue.css";

const Issue = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem("token");

  const fetchIssues = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/issue/all/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setIssues(response.data.issues || []);
    } catch (error) {
      console.error("Error fetching issues:", error);
      setIssues([]);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [id]);

  // Create issue
  const handleCreateIssue = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Please enter title and description");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/issue/create/${id}`,
        {
          title: title,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Issue created successfully!");

      setTitle("");
      setDescription("");
      setShowForm(false);

      fetchIssues();
    } catch (error) {
      console.error("Error creating issue:", error);
      alert("Could not create issue");
    }
  };

  const handleDeleteIssue = async (issueId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this issue?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/issue/delete/${issueId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Issue deleted successfully!");

      setIssues(issues.filter((issue) => issue._id !== issueId));
    } catch (error) {
      console.error("Error deleting issue:", error);
      alert("Could not delete issue");
    }
  };

  return (
    <>
      <Navbar />

      <div className="issue-page">
        {/* Header */}
        <div className="issue-header">
          <div>
            <h1>
              <i className="fa-regular fa-circle-dot"></i>
              &nbsp; Issues
            </h1>

            <p>Track and manage issues for this repository</p>
          </div>

          <div className="issue-header-buttons">
            <Button variant="outlined" onClick={() => navigate(`/repo/${id}`)}>
              Back to Repository
            </Button>

            <Button variant="contained" onClick={() => setShowForm(!showForm)}>
              + New Issue
            </Button>
          </div>
        </div>

        {showForm && (
          <div className="create-issue-box">
            <h2>Create New Issue</h2>

            <form onSubmit={handleCreateIssue}>
              <input
                type="text"
                placeholder="Issue title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Describe the issue..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="form-buttons">
                <Button type="submit" variant="contained">
                  Create Issue
                </Button>

                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    setShowForm(false);
                    setTitle("");
                    setDescription("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="issues-container">
          <div className="issues-title"><br/>
            <h2>
              {issues.length} {issues.length === 1 ? "Issue" : "Issues"}
            </h2>
          </div>

          {issues.length > 0 ? (
            issues.map((issue) => (
              <div className="issue-card" key={issue._id}>
                <div className="issue-main">
                  <div className="issue-title-row">
                    <i className="fa-regular fa-circle-dot"></i>
                    <h3>{issue.title}</h3>
                  </div>

                  <p className="issue-description">{issue.description}</p>
                </div>

                <div className="issue-right">
                  <span className="status-open">{issue.status}</span>
                  {localStorage.getItem("userId") === issue.createdBy && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteIssue(issue._id)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-issues">
              <i className="fa-regular fa-circle-check"></i>

              <h2>No issues found</h2>

              <p>This repository doesn't have any issues yet.</p>

              <Button variant="contained" onClick={() => setShowForm(true)}>
                Create the first issue
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Issue;
