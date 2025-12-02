import { Router } from "express";
import apartmentController from "../controllers/apartment.controller.js";

const appRouter = Router();

appRouter.get("/list", (request, response, next) => {
    apartmentController.listApartments(request, response, next);
});

appRouter.post("/createApt", (request, response, next) => {
    apartmentController.newApartment(request, response, next);
});

export default appRouter;