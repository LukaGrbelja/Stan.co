import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import errorHandler from "./middlewares/errorHandler.js";

class Server {
    app;

    constructor() {
        this.app = express();

        this.loadCors();
        this.loadJson();
        this.loadRoutes();
        this.loadErrorHandler();
    }

    loadCors() {
        this.app.use(cors());
    }
    loadJson() {
        this.app.use(express.json());
    }
    loadRoutes() {
        this.app.use("/", router);
    }
    loadErrorHandler() {
        this.app.use(errorHandler);
    }
    listen(port = 4000) {
        this.app.listen(port, () => {
            console.log(`Listening on port: ${port}`);
        })
    }
}

export default new Server;