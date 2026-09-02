const express = require("express");
const issueController = require("../controllers/IssueController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const issueRouter = express.Router();

issueRouter.post("/issue/create/:id", authMiddleware, issueController.createIssue);
issueRouter.put("/issue/update/:id", authMiddleware, issueController.updateIssueById);
issueRouter.get("/issue/all/:id", authMiddleware, issueController.getAllIssue);
issueRouter.get("/issue/:id", authMiddleware, issueController.getIssueById);
issueRouter.delete("/issue/delete/:id", authMiddleware, issueController.deleteIssue);

module.exports=issueRouter;