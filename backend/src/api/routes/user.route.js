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

userRouter.patch("/update", (request, response, next) => {
    UserController.update(request, response, next);
});

userRouter.get("/data", (request, response, next) => {
    UserController.get(request, response, next)
});

userRouter.get("/decode", (request, response, next) => {
    UserController.decode(request, response, next)
});

export default userRouter;