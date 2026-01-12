import UserModel from "../models/user.model.js";

class UserRepository {

    async get(entity) { return UserModel.findOne({ userName: entity }); }

    async getById(id) { return UserModel.findById(id); }

    async create(entity) {

        const newUser = new UserModel(entity);
        await newUser.save();
        return newUser;

    }

    async update(filter, data) { return UserModel.updateOne(filter, data); }

}

export default new UserRepository;