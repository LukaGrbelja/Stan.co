import { Router } from "express";
import reservationController from "../controllers/reservation.controller.js";

const reservationRouter = Router();

reservationRouter.post("/newReservation", async (request, response, next) => {
    reservationController.newReservation(request, response, next);
});

reservationRouter.get("/user", async (request, response, next) => {
    reservationController.getReservationsForUser(request, response, next);
});

reservationRouter.get("/:id/roommates", reservationController.getRoommates);

export default reservationRouter;