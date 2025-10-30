import ApartmentModel from "../models/apartment.model.js";

class ApartmentRepository {

    async get(entity) { return ApartmentModel.find({ owner: entity }); }

    async create(entity) {

        const newApt = new ApartmentModel(entity);
        await newApt.save();
        return newApt;

    }
}

export default new ApartmentRepository;