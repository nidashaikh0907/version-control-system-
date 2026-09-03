const mongoose = require("mongoose");
const Repository = require("../models/repoModel.js");
const user = require("../models/userModel.js");
const Issue = require("../models/issueModel.js");

async function createIssue(req, res) {
  const { title, description } = req.body;
  const { id } = req.params;
  try {
    const newIssue = new Issue({
      title,
      description,
      repository: id,
      createdBy: req.user.id,
    });

    const result = await newIssue.save();
    res.json({
      message: "issue created",
      issue: result,
    });
  } catch (err) {
    console.error("error during creating issue!", err.message);
    res.status(500).send("server error!");
  }
}

async function updateIssueById(req, res) {
  const { title, description, status } = req.body;
  const { id } = req.params;
  try {
    const Issue = await Issue.findById(id);
    if (!currentIssue) {
      return res.status(404).json({ err: "Issue not found" });
    }
    Issue.title = title;
    Issue.description = description;
    Issue.status = status;

    const updatedIssue = await Issue.save();

    res.json({
      message: "Issue updated successfully",
      issue: updatedIssue,
    });
  } catch (err) {
    console.error("error during updating issue!", err.message);
    res.status(500).send("server error!");
  }
}

async function getAllIssue(req, res) {
  const { id } = req.params;

  try {
    const issues = await Issue.find({
      repository: new mongoose.Types.ObjectId(id),
    });

    res.json({
      message: "Found all Issues",
      issues: issues,
    });

  } catch (err) {
    console.error("error during fetching issue!", err.message);
    res.status(500).send("server error!");
  }
}

async function getIssueById(req, res) {
  const { id } = req.params;
  try {
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue Not Found!" });
    }
    res.json({
      message: "Issue Fetched Successfully",
      issue: issue,
    });
  } catch (err) {
    console.error("error during fething issue!", err.message);
    res.status(500).send("server error!");
  }
}

async function deleteIssue(req, res) {
  const { id } = req.params;
  try {
    const deleteIssue = await Issue.findByIdAndDelete(id);
    if (!deleteIssue) {
      return res.status(404).json({ message: "Issue Not Found!" });
    }
    res.json({
      message: "Issue Deleted Successfully",
      issue: deleteIssue,
    });
  } catch (err) {
    console.error("error during deleting issue!", err.message);
    res.status(500).send("server error!");
  }
}

module.exports = {
  createIssue,
  updateIssueById,
  getAllIssue,
  getIssueById,
  deleteIssue,
};
