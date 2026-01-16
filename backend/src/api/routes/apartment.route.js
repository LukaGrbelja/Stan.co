import { Router } from "express";
import apartmentController from "../controllers/apartment.controller.js";
import { uploadImg } from "../../database/cloudinary/connection.js"

const appRouter = Router();

appRouter.get("/list", (request, response, next) => {
    apartmentController.listApartments(request, response, next);
});

appRouter.post("/createApt", uploadImg.array("images"), (request, response, next) => {
    apartmentController.newApartment(request, response, next);
});

appRouter.delete("/:id", apartmentController.deleteApartment)

export default appRouter;