const mongoose = require("mongoose");
const Repository = require("../models/repoModel.js");
const User = require("../models/userModel.js");
const Issue = require("../models/issueModel.js");
const { addRepo } = require("./add.js");
const { commitRepo } = require("./commit.js");
const { pushRepo } = require("./push.js");

async function createRepository(req, res) {
  const { owner, name, issues, content, description, visibility } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ error: "Repository Name is Required!" });
    }
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "Invalid User!" });
    }

    const newRepository = new Repository({
      name,
      description,
      visibility,
      issues,
      owner,
      content,
    });

    const result = await newRepository.save();
    res.status(201).json({
      messgae: "Repository Created",
      repositoryID: result._id,
    });
  } catch (err) {
    console.error("error during execution!", err.message);
    res.status(500).send("server error!");
  }
}

async function getAllRepository(req, res) {
  try {
    const repositories = await Repository.find({})
      .populate("owner")
      .populate("issue"); //used populate to fetch entire details of owner and issues
    res.json(repositories);
  } catch (err) {
    console.error("error during fetching repositories!", err.message);
    res.status(500).send("server error!");
  }
}

async function fetchedRepositoryById(req, res) {
  const id = req.params.id;
  try {
    const repository = await Repository.findOne({ _id: id })
      .populate("owner")
      .populate("issue");

    if (!repository) {
      return res.status(404).json({ message: "Repository Do Not Exists!" });
    }
    res.json(repository);
  } catch (err) {
    console.error("error during fetching repositories!:", err.message);
    res.status(500).send("server error!");
  }
}

async function fetchedRepositoryByName(req, res) {
  const { name } = req.params;
  try {
    const repositoryByName = await Repository.findOne({ name })
      .populate("owner")
      .populate("issue");

    if (!repositoryByName) {
      return res
        .status(404)
        .json({ message: "Repository By This Name Do Not Exists!" });
    }
    res.json(repositoryByName);
  } catch (err) {
    console.error("error during fetching repositories!", err.message);
    res.status(500).send("server error!");
  }
}

async function fetchedRepositoryForCurrentUser(req, res) {
  const userId = req.params.userID;
  try {
    const repositories = await Repository.find({
      owner: userId,
    });
    return res.status(200).json({
      message: "Repository found!",
      repositories: repositories,
    });
  } catch (err) {
    console.error("ERROR:", err.message);

    return res.status(500).json({
      error: err.message,
    });
  }
}
async function updateRepositoryById(req, res) {
  const { id } = req.params;
  const { content, description } = req.body;

  try {
    const repository = await Repository.findById(id);

    if (!repository) {
      return res.status(404).json({ error: "Repository not found" });
    }

    repository.content.push(content);
    repository.description = description;

    const updatedRepository = await repository.save();

    res.json({
      message: "Repository updated successfully",
      repository: updatedRepository,
    });
  } catch (err) {
    console.error("error during updating repository:", err.message);
    res.status(500).send("server error!");
  }
}

async function toogleVisibilityById(req, res) {
  const { id } = req.params;

  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ error: "Repository not found" });
    }

    repository.visibility = !repository.visibility;

    const updatedRepository = await Repository.save();

    res.json({
      message: "Repository visibility toggled Successfullty",
      repository: updatedRepository,
    });
  } catch (err) {
    console.error("error during toggling visibility repository:", err.message);
    res.status(500).send("server error!");
  }
}

async function deleteRepository(req, res) {
  const { id } = req.params;

  try {
    const repository = await Repository.findByIdAndDelete(id);
    if (!repository) {
      return res.status(404).json({
        message: "Repository not found!",
      });
    }
    res.json({
      message: "Repository Deleted Successfully",
    });
  } catch (err) {
    console.error("error during deleting repository:", err.message);
    res.status(500).send("server error!");
  }
}
async function uploadFile(req, res) {
  try {
    const repoId = req.params.id;

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }
    const repository = await Repository.findById(repoId);
    if (!repository) {
      return res.status(404).json({
        message: "Repository not found",
      });
    }
    repository.content.push(req.file.originalname);
    await repository.save();
    await addRepo(req.file.path);

    await commitRepo("Added " + req.file.originalname);

    await pushRepo();

    return res.status(200).json({
      message: "File uploaded, committed and pushed successfully",
      fileName: req.file.originalname,
    });
  } catch (error) {
    console.error("Error uploading file:", error);

    return res.status(500).json({
      message: "Error uploading file",
      error: error.message,
    });
  }
}

async function starRepository(req, res) {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const repository = await Repository.findById(id);
    if (!repository) {
      return res.status(404).json({ message: "Repository not found!" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const alreadyStarred = user.starRepos.some(
      (repoId) => repoId.toString() === id,
    );

    if (alreadyStarred) {
      user.starRepos = user.starRepos.filter(
        (repoId) => repoId.toString() !== id,
      );

      await user.save();

      return res.status(200).json({
        message: "Repository unstarred",
      });
    }

    user.starRepos.push(repository._id);

    await user.save();

    return res.status(200).json({
      message: "Repository starred",
    });
  } catch (error) {
    console.error("Error starring repository:", error);
    return res.status(500).json({ message: "Error starring repository" });
  }
}
module.exports = {
  createRepository,
  getAllRepository,
  fetchedRepositoryByName,
  fetchedRepositoryById,
  fetchedRepositoryForCurrentUser,
  updateRepositoryById,
  toogleVisibilityById,
  deleteRepository,
  uploadFile,
  starRepository,
};
