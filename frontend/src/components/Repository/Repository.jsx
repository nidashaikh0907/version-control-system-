import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Navbar from "../Navbar.jsx";
import "./Repository.css";
import DeleteIcon from "@mui/icons-material/Delete";

const Repository = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [repository, setRepository] = useState(null);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/repo/${id}/upload`,
        formData,
      );

      console.log("Upload successful:", response.data);
      setFiles((previousFiles) => [...previousFiles, file.name]);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("File upload failed");
    }
  };

  const handleDeleteRepository = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this repository?",
    );
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/repo/delete/${id}`);
      alert("Repository deleted successfully");
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting repository:", error);
      alert("Failed to delete repository");
    }
  };

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/repo/${id}`);
        setRepository(response.data);
        const content = response.data.content || [];

        const fileList = content.flatMap((item) =>
          item.split("\n").filter((file) => file.trim() !== ""),
        );

        setFiles(fileList);
      } catch (error) {
        console.error("Error fetching repository:", error);
      }
    };
    fetchRepository();
  }, [id]);

  return (
    <div>
      <Navbar />
      <br />
      <div className="user-details">
        <div className="title">
          <i className="fa-solid fa-book-bookmark"></i>
          <h1>{repository?.name}</h1>&nbsp;
          <h3> {repository?.visibility ? "public" : "private"}</h3>
          {localStorage.getItem("userId") === repository?.owner?._id && (
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              className="user-delete"
              onClick={handleDeleteRepository}
            >
              Delete
            </Button>
          )}
        </div>
        <br />
        <p id="description">{repository?.description}</p>
        <div className="owner-details">
          <i className="fa-regular fa-user"></i>
          <p>Owner:{repository?.owner?.username}</p>
        </div>
        <div className="repo-date">
          <i className="fa-solid fa-calendar-days"></i>
          <p>
            Created at:{" "}
            {repository?.createdAt
              ? new Date(repository.createdAt).toLocaleDateString()
              : "Loading..."}
          </p>
        </div>
      </div>
      <br />

      <div className="files-section">
        <div className="files-topsection">
          <h1>Files</h1>
          <div className="files-buttons">
            <Button
              variant="contained"
              onClick={() => navigate(`/repo/${id}/issues`)}
            >
              <i className="fa-regular fa-circle-dot"></i>
              &nbsp; Issues
            </Button>
            {localStorage.getItem("userId") === repository?.owner?._id && (
              <Button variant="contained" onClick={handleUpload}>
                Upload File
              </Button>
            )}
          </div>
        </div>
        <div className="file-list">
          {files.length > 0 ? (
            files.map((file, index) => (
              <div
                className="file-item"
                key={index}
                onClick={() => alert(`You clicked ${file}`)}
              >
                <i className="fa-solid fa-file"></i>
                <span>{file}</span>
              </div>
            ))
          ) : (
            <p>No files uploaded yet.</p>
          )}
        </div>
        <br />
      </div>
      <br />

      {localStorage.getItem("userId") === repository?.owner?._id && (
        <div
          className="upload-file"
          onClick={() => {
            fileInputRef.current.click();
          }}
        >
          <i className="fa-solid fa-cloud-arrow-up"></i>

          <b>
            <h3>Upload your File</h3>
          </b>
          <p>Add files to your repository</p>
          <br />
          <label>
            <input ref={fileInputRef} type="file" onChange={handleFileChange} />
          </label>
          {file && (
            <p>
              <b>Selected File: </b>
              {file.name}
            </p>
          )}
        </div>
      )}

      <br />
    </div>
  );
};

export default Repository;
