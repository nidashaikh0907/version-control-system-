const mongoose = require("mongoose");
const Repository = require("../models/repoModel.js");
const User = require("../models/userModel.js");
const Issue = require("../models/issueModel.js");

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
  const userId = req.user;
  console.log(req.user);
  try {
    const repositories = await Repository.find({ owner: userId });
    if (!repositories || repositories.length == 0) {
      return res.status(404).json({ error: "User Repositories not found" });
    }
    res.json({ message: "Repository found!" }, repositories);
  } catch (err) {
    console.error("error during fetching user repositories:", err.message);
    res.status(500).send("server error!");
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
    const Repository = await Repository.findByIdAndDelete(id);
    if (!Repository) {
      return res.status(404).json({ message: "Repository not found!" });
    }
    res.json({ message: "Repository Deleted Successfully" });
  } catch (err) {
    console.error("error during deleting repository:", err.message);
    res.status(500).send("server error!");
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
};
