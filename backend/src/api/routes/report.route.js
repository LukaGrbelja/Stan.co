import { Router } from "express";
import Report from "../../database/mongodb/models/report.model.js";

import { HttpError } from "../middlewares/errorHandler.js";

const reportRouter = Router();

reportRouter.post("/createReport", async (request, response, next) => {
    try {
        const { reportedUser, reason, description } = request.body;

        if (!reportedUser || !reason) { return next(new HttpError(400, "Missing required fields")); }

        const report = await Report.create({ reportedUser, reason, description });

        response.status(201).send(report);
    } catch (error) { next(new HttpError(500, error)); }
});

export default reportRouter;