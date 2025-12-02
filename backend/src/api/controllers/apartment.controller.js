import apartmentInteractor from "../../database/interactors/apartment.interactor.js";
import { HttpError } from "../middlewares/errorHandler.js";

class ApartmentController {
    async newApartment(request, response, next) {
        try {

            const newApt = request.body;
            const iResponse = await apartmentInteractor.newApartment(newApt);

            response.status(200).send(iResponse);

        } catch (error) {

            next(new HttpError(500, error));

        }
    }

    async listApartments(request, response, next) {
        try {

            const filters = { ...request.query };

            if (filters.hood === "All" || filters.hood === "") {
                delete filters.hood;
            }

            if (filters.livingArea) {
                filters.livingArea = { $lte: Number(filters.livingArea) };
            }

            if (filters.numOfRooms) {
                filters.numOfRooms = { $lte: Number(filters.numOfRooms) };
            }

            const iResponse = await apartmentInteractor.listApartments(filters);
            response.status(200).send(iResponse);


        } catch (error) {

            next(new HttpError(500, error));

        }
    }
}

export default new ApartmentController;