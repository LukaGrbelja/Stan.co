import userRepository from "../mongodb/repos/user.repo.js";

// pozivanje funkcija koje komuniciraju s bazom
// svo sredivanje podataka
// ispitivanje odgovora baze
// u buducnosti jwt tokeni??? hashiranje?

class UserInteractor {

    async logIn(userData) {

        const existingUser = await userRepository.get(userData.userName);
        if (!existingUser) {
            throw new Error("CredentialsError");
        }

        const isValidPassword = userData.password == existingUser.password;
        if (!isValidPassword) {
            throw new Error("CredentialsError");
        }

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


        delete userData.passwordAgain;
        //hash
        const newUser = await userRepository.create(userData);
        return newUser;


    }

}

export default new UserInteractor;