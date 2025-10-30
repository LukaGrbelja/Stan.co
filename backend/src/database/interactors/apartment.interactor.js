import ApartmentRepository from "../mongodb/repos/apartment.repo.js";
import userRepository from "../mongodb/repos/user.repo.js";

class ApartmentInteractor {
    async newApartment(aptData) {

        const user = await userRepository.get("PrviKorisnik");
        if (!user) {
            throw new Error("CredentialsError");
        }

        const newApt = { owner: user._id, ...aptData };
        const mongoResponse = await ApartmentRepository.create(newApt);
        return mongoResponse;

    }
    async listApartments(userData) {

        const user = await userRepository.get(userData);
        if (!user) {
            throw new Error("CredentialsError");
        }

        const mongoResponse = await ApartmentRepository.get(user._id);
        return mongoResponse;

    }
}

export default new ApartmentInteractor;