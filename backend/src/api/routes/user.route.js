import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/login", (request, response, next) => {
    UserController.logIn(request, response, next);
});

userRouter.post("/signup", (request, response, next) => {
    UserController.signUp(request, response, next);
});

export default userRouter;