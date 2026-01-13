
import { HttpError } from "../middlewares/errorHandler.js";

import commRepo from "../../database/mongodb/repos/communication.repo.js";
import userInteractor from "../../database/interactors/user.interactor.js";

// primanje podataka iz axios requesta
// prosljedivanje podataka
// response frontendu odnosno odredivanje statusa i greski

class CommunicationController {
    async create(request, response, next) {
        try {
            const { type } = request.body;
            const usersData = Object.fromEntries(Object.entries(request.body).splice(1, 2));

            if (type === "first") {
                const headerData = {
                    ...usersData,
                    type: "Header",
                    allowed: "false"
                }
                const mongodbResponse = await commRepo.create(headerData);

                const messageData = {
                    chatId: mongodbResponse._id,
                    sender: request.body.sender,
                    type: "Message",
                    message: request.body.data
                }
                await commRepo.create(messageData);

                response.status(201).send("Communication created successfully");
            }
            else {
                const messageData = {
                    chatId: request.body.chatId,
                    sender: request.body.sender,
                    type: "Message",
                    message: request.body.data
                }
                const newMessage = await commRepo.create(messageData);

                response.status(201).send(newMessage);
            }

        } catch (error) {
            next(new HttpError(500, error));
        }
    }
    async getMessages(request, response, next) {
        try {
            const filterData = {
                ...request.query.id,
                type: "Message"
            }
            const data = await commRepo.get(filterData);

            response.status(200).send(data);
        } catch (error) {
            next(new HttpError(500, error));
        }
    }
    async check(request, response, next) {
        try {
            const filterData = {
                ...request.query,
                type: "Header"
            }

            const commHeader = await commRepo.get(filterData);

            if (commHeader.length > 0) {
                return response.status(200).send(commHeader);
            }
            else {
                return response.status(404).send("No communication header found");
            }
        } catch (error) {
            next(new HttpError(500, error));
        }
    }
    async getHeaders(request, response, next) {
        try {
            let data = [];

            let userId = request.query.id;
            if (!userId) {
                return next(new HttpError(400, "Missing or invalid user id"));
            }


            let filterData = {
                sender: userId,
                type: "Header"
            }
            let dbData = await commRepo.get(filterData);
            for (const header of dbData) {
                const user = await userInteractor.getById(header.receiver);
                data.push({
                    id: header._id,
                    userName: user.userName,
                    profilePicture: user.profilePicture,
                    allowed: header.allowed
                });
            }

            filterData = {
                receiver: request.query.id,
                type: "Header"
            }
            dbData = await commRepo.get(filterData);
            for (const header of dbData) {
                const user = await userInteractor.getById(header.sender);
                data.push({
                    id: header._id,
                    userName: user.userName,
                    profilePicture: user.profilePicture,
                    allowed: header.allowed
                });
            }

            response.status(200).send(data);
        } catch (error) {
            next(new HttpError(500, error));
        }
    }
    async changeHeaderPermission(request, response, next) {
        try {

            const usersData = Object.fromEntries(Object.entries(request.body).splice(0, 2));

            const filterData = {
                ...usersData,
                type: "Header"
            };

            const updateData = {
                allowed: request.body.data
            };

            await commRepo.update(filterData, updateData);

            response.status(200).send("Header updated successfully");
        } catch (error) {
            next(new HttpError(500, error));
        }
    }
}

export default new CommunicationController;