import { Schema, model } from "mongoose";

const CommunicationSchema = new Schema({
    type: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User"},
    chatId: { type: Schema.Types.ObjectId, ref: "Comms" },
    message: { type: String },
    allowed: { type: String }
});

const CommunicationModel = model("Comms", CommunicationSchema, "comms");

export default CommunicationModel;