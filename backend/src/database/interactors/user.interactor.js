import bcrypt from "bcryptjs";//Pomakni u kontroler
import userRepository from "../mongodb/repos/user.repo.js";

// pozivanje funkcija koje komuniciraju s bazom
// svo sredivanje podataka
// ispitivanje odgovora baze
// u buducnosti jwt tokeni??? hashiranje?

class UserInteractor {

    async logIn(userData) {// veći dio potrebno pomaknuti u kontroler

        const existingUser = await userRepository.get(userData.userName);
        if (!existingUser) {
            throw new Error("CredentialsError");
        }

        let passwordValidity = bcrypt.compareSync(userData.password, existingUser.password);

        if (!passwordValidity) {
            throw new Error("CredentialsError");
        };

        return existingUser;
    }

    async signUp(userData) {

        let existingUser = await userRepository.get(userData.userName);
        if (existingUser) {
            throw new Error("E11000U");
        }

        existingUser = await userRepository.get(userData.email);
        if (existingUser) {
            throw new Error("E11000E");
        }


        delete userData.passwordAgain;//kontroler
        const newUser = await userRepository.create(userData);
        return newUser;


    }

    async update(filter, data) {
        await userRepository.update(filter, data);
    }

    async get(filter) {
        return await userRepository.get(filter);
    }

    async getById(id) {
        return await userRepository.getById(id);
    }

}

export default new UserInteractor;