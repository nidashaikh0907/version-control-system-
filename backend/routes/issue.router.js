const express = require("express");
const issueController = require("../controllers/IssueController.js");

const issueRouter = express.Router();

issueRouter.post("/issue/create", issueController.createIssue);
issueRouter.put("/issue/update/:id", issueController.updateIssue);
issueRouter.get("/issue/all", issueController.getAllIssue);
issueRouter.get("/issue/:id", issueController.getIssueById);
issueRouter.delete("/issue/delete/:id", issueController.getAllIssue);

module.exports=issueRouter;