import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();
const { connect, connection } = mongoose;

async function connectDB() {
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/DataBaseName";

    if (!MONGODB_URI) {
        console.error("MongoDB path has not been found");
    }

    try {

        await connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("Mongodb connection successfull");

        connection.on("error", (err) => {
            console.error("MongoDB runtime error:", err);
        });

        connection.on("disconnected", () => {
            console.warn("MongoDB connection failed. Recconecting...");
            reconnect();
        });

    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        setTimeout(reconnect, 5000);
    }

}

async function reconnect() {
    try {
        await connect(process.env.MONGODB_URI);
        console.log("Recconected to MongoDB");
    } catch (err) {
        console.error("Reconnection failed:", err.message);
        setTimeout(reconnect, 5000);
    }
}

export default connectDB;