const express = require("express");
const userController = require("../controllers/UserController.js");

const userRouter = express.Router();


userRouter.get("/allUsers", userController.getAllusers);
userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.put("/userprofile/:id", userController.getUserProfile);
userRouter.put("/updateprofile/:id", userController.updateUserProfile);
userRouter.delete("/deleteprofile/:id", userController.deleteUserProfile);

module.exports= userRouter;
