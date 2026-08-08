const createIssue = (req, res) => {
  res.send("Issue created successfully");
};

const updateIssue = (req, res) => {
  res.send("Issue updated successfully");
};

const getAllIssue = (req, res) => {
  res.send("All Issues Fetched");
};

const getIssueById = (req, res) => {
  res.send("Issues fetched");
};

const deleteIssue = (req, res) => {
  res.send("Issue deleted successfully");
};

module.exports = {
  createIssue,
  updateIssue,
  getAllIssue,
  getIssueById,
  deleteIssue,
};
