const express = require("express");
const userController = require("../controllers/UserController.js");

const userRouter = express.Router();

userRouter.get("allUsers", userController.getAllusers);
userRouter.post("signup", userController.signup);
userRouter.post("login", userController.login);
userRouter.put("userprofile", userController.getUserProfile);
userRouter.put("updateprofile", userController.updateUserProfile);
userRouter.delete("delete", userController.deleteUserProfile);

module.exports= userRouter;
