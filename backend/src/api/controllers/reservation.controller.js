import { HttpError } from "../middlewares/errorHandler.js";
import reservationRepo from "../../database/mongodb/repos/reservation.repo.js";

class ReservationController {
    async newReservation(request, response, next) {
        try {
            const reservationData = {
                ...request.body,
                status: "ongoing"
            }

            const newReservation = await reservationRepo.create(reservationData);

            response.status(201).send(newReservation);
        } catch (error) {

            next(new HttpError(500, error));

        }
    }
    async getReservationsForUser(request, response, next) {
        try {
            const { userType } = request.query;

            let filter = {};
            if (userType === "Iznajmljivač") {

                const { apartmentId } = request.query;
                filter = { apartmentId: apartmentId };

            } else if (userType === "Cimer") {

                const { userId } = request.query;
                filter = { roomateId: userId };

            } else { return next(new HttpError(400, "Invalid user type")); }

            const reservations = await reservationRepo.get(filter);

            response.status(200).send(reservations);
        } catch (error) {
            next(new HttpError(500, error));
        }
    }
    async getRoommates(request, response, next) {
        try {

            const { id } = request.params;

            let roommates = await reservationRepo.get({ $or: [{ _id: id }, { threadId: id }], status: "ongoing" }, "roomateId");

            if (!roommates) return next(new HttpError(404, "Rezervacija ne postoji"));

            return response.send(roommates.map(roomate => roomate.roomateId));
        }
        catch (error) { next(new HttpError(500, error)); }
    }
}

export default new ReservationController();