import ReservationModel from "../models/reservation.model.js";

class ReservationRepository {

    async get(filters, populate) {
        let query = ReservationModel.find(filters);
        if (populate) query = query.populate(populate);
        return query;
    }

    async create(entity) {

        const newReservation = new ReservationModel(entity);
        await newReservation.save();
        return newReservation;

    }
}

export default new ReservationRepository();