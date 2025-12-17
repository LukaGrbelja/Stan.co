import ApartmentRepository from "../mongodb/repos/apartment.repo.js";
import userRepository from "../mongodb/repos/user.repo.js";

class ApartmentInteractor {
    async newApartment(aptData) {

        const user = await userRepository.get("Matem");
        if (!user) {
            throw new Error("CredentialsError");
        }

        const newApt = { owner: user._id, ...aptData };
        const mongoResponse = await ApartmentRepository.create(newApt);
        return mongoResponse;

    }
    
    async listApartments(filters) {

        const mongoResponse = await ApartmentRepository.get(filters);
        return mongoResponse;
        
    }
}

export default new ApartmentInteractor;