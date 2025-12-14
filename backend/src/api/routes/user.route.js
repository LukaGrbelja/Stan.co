import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { uploadImg } from "../../database/cloudinary/connection.js";

const userRouter = Router();

userRouter.post("/login", (request, response, next) => {
    UserController.logIn(request, response, next);
});

userRouter.post("/signup", uploadImg.single("image"), (request, response, next) => {
    UserController.signUp(request, response, next);
});

export default userRouter;