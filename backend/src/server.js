import expressApp from "./api/index.js";
import connectDB from "./database/mongodb/connection.js";

connectDB();
expressApp.listen();