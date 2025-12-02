import ApartmentModel from "../models/apartment.model.js";

class ApartmentRepository {

    async get(filters) { return ApartmentModel.find(filters); }

    async create(entity) {

        const newApt = new ApartmentModel(entity);
        await newApt.save();
        return newApt;

    }
}

export default new ApartmentRepository;