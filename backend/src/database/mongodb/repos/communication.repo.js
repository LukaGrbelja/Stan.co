import CommunicationModel from "../models/communication.model.js";

class CommunicationRepository {

    async get(filters) { return CommunicationModel.find(filters); }

    async create(entity) {

        const newApt = new CommunicationModel(entity);
        await newApt.save();
        return newApt;

    }
}

export default new CommunicationRepository;