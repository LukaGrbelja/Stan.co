import userInteractor from "../../database/interactors/user.interactor.js";
import { HttpError } from "../middlewares/errorHandler.js";

// primanje podataka iz axios requesta
// prosljedivanje podataka
// response frontendu odnosno odredivanje statusa i greski

class UserController {
    async logIn(request, response, next) {
        try {

            const user = request.body;
            const data = await userInteractor.logIn(user);

            response.status(200).send(data);

        } catch (error) {

            if (error.message == "CredentialsError") {
                error.message = "Credentials are not correct";
                next(new HttpError(401, error));
            }
            else {
                next(new HttpError(500, error));
            }

        }
    }
    async signUp(request, response, next) {
        try {

            const newUser = request.body;
            await userInteractor.signUp(newUser);

            response.status(201).send(newUser);

        } catch (error) {
            
            if (error.message == "E11000U") {
                error.message = "Koristeno korisnicko ime!";
                next(new HttpError(409, error));
            }
            else if (error.message == "E11000E") {
                error.message = "Koristen email!";
                next(new HttpError(409, error));
            }
            else {
                next(new HttpError(500, error));
            }

        }
    }
}

export default new UserController;