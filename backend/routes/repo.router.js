const express = require("express");
const multer = require("multer");
const repoController = require("../controllers/RepoController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const repoRouter = express.Router();

const upload = multer({ dest: "temp-uploads/" });

repoRouter.post("/repo/create", repoController.createRepository);
repoRouter.get("/repo/all", repoController.getAllRepository);
repoRouter.get("/repo/name/:name", repoController.fetchedRepositoryByName);
repoRouter.get(
  "/repo/user/:userID",
  repoController.fetchedRepositoryForCurrentUser,
);
repoRouter.put("/repo/update/:id", repoController.updateRepositoryById);
repoRouter.patch("/repo/toggle/:id", repoController.toogleVisibilityById);
repoRouter.post(
  "/repo/:id/star",
  authMiddleware,
  repoController.starRepository,
);
repoRouter.delete("/repo/delete/:id", repoController.deleteRepository);
repoRouter.post(
  "/repo/:id/upload",
  upload.single("file"),
  repoController.uploadFile,
);
repoRouter.get("/repo/:id", repoController.fetchedRepositoryById);

module.exports = repoRouter;
