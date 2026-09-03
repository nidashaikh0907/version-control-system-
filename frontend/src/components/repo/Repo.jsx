import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import profile from "../../assets/image.png";
import "./Repo.css";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Navbar from "../Navbar.jsx";

const Repo = () => {
  const [userDetails, setUserDetails] = useState({});
  const [repoDetails, setRepoDetails] = useState({
    name: "",
    description: "",
    content: "",
    visibility: "public",
  });

  const createRepo = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.log("user is not logged in");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/repo/create", {
        owner: userId,
        name: repoDetails.name,
        description: repoDetails.description,
        content: repoDetails.content,
        visibility: repoDetails.visibility == "public",
      });

      console.log("Repository created successfully:", response.data);
      window.location.href = `/repo/${response.data.repositoryID}`;
    } catch (error) {
      console.error("Error creating repository:", error);
    }
  };
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
     <Navbar/>
      <div className="repo-page">
        <h3>Create a new repository</h3>
        <br />

        <p>Repositories contain a project's files and version history</p>

        <p>Required fields are marked with an asterisk (*).</p>
      </div>

      <div className="repo-container">
        <h3>General</h3>

        <div className="repo-name">
          <div className="field">
            <h4>Owner *</h4>

            <div className="owner">
              <img src={profile} className="profile" />
              <h4>{userDetails.username}</h4>
            </div>
          </div>

          <span className="slash">/</span>

          {/* Repository name */}
          <div className="field repo-field">
            <h4>Repository name *</h4>

            <TextField
              variant="outlined"
              value={repoDetails.name}
              onChange={(e) =>
                setRepoDetails({
                  ...repoDetails,
                  name: e.target.value,
                })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#30363d",
                  },

                  "&:hover fieldset": {
                    borderColor: "white",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },

                "& .MuiOutlinedInput-input": {
                  color: "white",
                },
              }}
            />
          </div>
        </div>

        {/* Description */}
        <div className="description">
          <h4>Description</h4>

          <TextField
            fullWidth
            variant="outlined"
            value={repoDetails.description}
            onChange={(e) =>
              setRepoDetails({
                ...repoDetails,
                description: e.target.value,
              })
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#30363d",
                },

                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white !important",
                },
              },

              "& .MuiOutlinedInput-input": {
                color: "white",
              },
            }}
          />

          <p>0 / 350 characters</p>
          <br />
          <h4>Content</h4>
          <TextField
            fullWidth
            multiline
            rows={5}
            value={repoDetails.content}
            onChange={(e) =>
              setRepoDetails({
                ...repoDetails,
                content: e.target.value,
              })
            }
             sx={{
              "& .MuiOutlinedInput-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#30363d",
                },

                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white !important",
                },
              },

              "& .MuiOutlinedInput-input": {
                color: "white",
              },
            }}
          />
        </div>
      </div>

      <span>
        {" "}
        <h2>Configuration</h2>
      </span>
      <div className="Configuration">
        <div className="config-text">
          <h4>Choose visibility*</h4>
          <p>Choose who can see and commit to this repository</p>
        </div>
        <div className="config-input">
          <FormControl>
            <Select
              value={repoDetails.visibility ? "public" : "private"}
              onChange={(e) =>
                setRepoDetails({
                  ...repoDetails,
                  visibility: e.target.value === "public",
                })
              }
              sx={{
                color: "white",
                "& .MuiSelect-icon": {
                  color: "white",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a5acb5",
                },
              }}
            >
              <MenuItem value="public">
                <i class="fa-solid fa-book-bookmark"></i>Public
              </MenuItem>
              <MenuItem value="private">
                <i class="fa-solid fa-lock"></i>Private
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <Button
        variant="contained"
        color="success"
        className="repo-button"
        onClick={createRepo}
      >
        Create Repository
      </Button><br/>
    </>
  );
};

export default Repo;