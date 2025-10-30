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
            
            const userName = request.params.userName;
            const iResponse = await apartmentInteractor.listApartments(userName);
            
            response.status(200).send(iResponse);

        } catch (error) {

            next(new HttpError(500, error));

        }
    }
}

export default new ApartmentController;