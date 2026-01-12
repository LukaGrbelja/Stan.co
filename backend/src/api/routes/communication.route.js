import { Router } from "express";
import commsController from "../controllers/communication.controller.js";

const commsRouter = Router();

commsRouter.post("/newMessage", (request, response, next) => {
    commsController.create(request, response, next);
});

commsRouter.get("/getMessages", (request, response, next) => {
    commsController.getMessages(request, response, next);
});

commsRouter.get("/check", (request, response, next) => {
    commsController.check(request, response, next);
});

commsRouter.get("/getHeaders", (request, response, next) => {
    commsController.getHeaders(request, response, next);
});

export default commsRouter;