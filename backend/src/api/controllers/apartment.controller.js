import apartmentInteractor from "../../database/interactors/apartment.interactor.js";
import userRepo from "../../database/mongodb/repos/user.repo.js"; //makni podhitno // triba se pojavljivat tek u interactoru// strukturiraj serrvise u Interactor datoteki
import { HttpError } from "../middlewares/errorHandler.js";

class ApartmentController {
    async newApartment(request, response, next) {
        try {

            const newApt = {
                ...JSON.parse(request.body.userData),
                pictures: request.files.map(file => file.path)
            };

            const iResponse = await apartmentInteractor.newApartment(newApt);

            response.status(200).send(iResponse);

        } catch (error) {

            next(new HttpError(500, error));

        }
    }

    async listApartments(request, response, next) {
        try {

            const filters = { ...request.query };

            if (!filters._id) {

                if (filters.hood === "Sve lokacije" || filters.hood === "") {
                    delete filters.hood;
                }

                if (filters.livingArea) {
                    filters.livingArea = { $lte: Number(filters.livingArea) };
                }

                if (filters.numOfRooms) {
                    filters.numOfRooms = { $lte: Number(filters.numOfRooms) };
                }

                if (filters.userName) {
                    await userRepo.get(filters.userName)
                        .then(data => data._id)
                        .then(id => {
                            delete filters.userName;
                            filters.owner = id
                        });// Odluci se za sintaksu koristi ili async/await ili then/catch
                }

            }

            const iResponse = await apartmentInteractor.listApartments(filters);
            response.status(200).send(iResponse);


        } catch (error) {

            next(new HttpError(500, error));

        }
    }
}

export default new ApartmentController;