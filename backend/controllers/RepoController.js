const createRepository = (req, res) => {
  res.send("Repository Created!");
};

const getAllRepository = (req, res) => {
  res.send("All Repository fetched!");
};

const fetchedRepositoryById = (req, res) => {
  res.send("Repository details fetched!");
};

const fetchedRepositoryByName = (req, res) => {
  res.send("Repository Created!");
};

const fetchedRepositoryForCurrentUser = (req, res) => {
  res.send("Repository Created!");
};

const updateRepository = (req, res) => {
  res.send("Repository Created!");
};

const toogleVisibilityById = (req, res) => {
  res.send("Repository Created!");
};

const deleteRepository = (req, res) => {
  res.send("Repository Created!");
};

module.exports = {
  createRepository,
  getAllRepository,
  fetchedRepositoryByName,
  fetchedRepositoryById,
  fetchedRepositoryForCurrentUser,
  updateRepository,
  toogleVisibilityById,
  deleteRepository,
};
