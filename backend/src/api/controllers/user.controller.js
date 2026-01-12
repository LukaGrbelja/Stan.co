import userInteractor from "../../database/interactors/user.interactor.js";
import { HttpError } from "../middlewares/errorHandler.js";
import JWTHandler from "../../database/jsonwt/index.js";
import bcrypt from "bcryptjs";

// primanje podataka iz axios requesta
// prosljedivanje podataka
// response frontendu odnosno odredivanje statusa i greski

class UserController {
    async logIn(request, response, next) {
        try {

            const user = request.body;
            const dbResponse = await userInteractor.logIn(user);

            const responseObject = {
                userName: dbResponse.userName,
                userType: dbResponse.userType,
                userId: dbResponse._id,
                profilePicture: dbResponse.profilePicture
            }

            const token = JWTHandler.generateToken(responseObject);

            responseObject.token = token;

            response.status(200).send(responseObject);

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

            const newUser = {
                ...JSON.parse(request.body.userData),
                profilePicture: request.file.path
            }

            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    throw err;
                }
                else {
                    bcrypt.hash(newUser.password, salt, async (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        else {
                            newUser.password = hash;
                            await userInteractor.signUp(newUser);
                        }
                    });
                }
            });

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
    async update(request, response, next) {
        try {
            const filter = { userName: request.body.userName };
            const data = { $set: { additionalData: request.body.data } };

            await userInteractor.update(filter, data);

            response.status(201).send({});

        } catch (error) {
            next(new HttpError(500, error));
        }
    }
    async get(request, response, next) {
        try {
            let data;
            if (request.query.userName) {
                data = await userInteractor.get(request.query.userName);
                //daj mogucnost da podatci nisu postavljeni
                response.status(201).send(data.additionalData);
            }
            else {
                data = await userInteractor.getById(request.query.id);

                data.additionalData.userType = data.userType;
                data.additionalData.profilePicture = data.profilePicture;

                response.status(201).send(data.additionalData);
            }

        } catch (error) {
            next(new HttpError(500, error));
        }
    }
    async decode(request, response, next) {
        try {
            const token = request.headers["authorization"].split(" ")[1];
            const data = JWTHandler.verifyToken(token);

            const userData = Object.fromEntries(Object.entries(data).slice(0, 3));
            response.status(201).send(userData);

        } catch (error) {
            next(new HttpError(500, error));
        }
    }
}

export default new UserController;