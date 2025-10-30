import UserModel from "../models/user.model.js";

class UserRepository {

    async get(entity) { return UserModel.findOne({ userName: entity }); }

    async create(entity) {

        const newUser = new UserModel(entity);
        await newUser.save();
        return newUser;

    }
}

export default new UserRepository;