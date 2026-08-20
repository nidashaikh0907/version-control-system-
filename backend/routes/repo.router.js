const express = require("express");
const repoController = require("../controllers/RepoController.js");

const repoRouter = express.Router();

repoRouter.post("/repo/create", repoController.createRepository);
repoRouter.get("/repo/all", repoController.getAllRepository);
repoRouter.get("/repo/name/:name", repoController.fetchedRepositoryByName);
repoRouter.get("/repo/user/:userID", repoController.fetchedRepositoryForCurrentUser);
repoRouter.put("/repo/update/:id", repoController.updateRepositoryById);
repoRouter.patch("/repo/toggle/:id", repoController.toogleVisibilityById);
repoRouter.delete("/repo/delete/:id", repoController.deleteRepository);
repoRouter.get("/repo/:id", repoController.fetchedRepositoryById);

module.exports = repoRouter;
