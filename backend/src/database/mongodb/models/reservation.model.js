import { Schema, model } from "mongoose";

const ReservationSchema = new Schema({
    type: { type: String, enum: ["Header", "Join"], required: true },
    apartmentId: { type: Schema.Types.ObjectId, ref: "Apartment" },
    threadId: { type: Schema.Types.ObjectId, ref: "Reservation" },
    roomateId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    price: { type: Number },
    status: { type: String, enum: ["ongoing", "cancelled", "finished"], default: "ongoing", required: true },
});

const ReservationModel = model("Reservation", ReservationSchema);

export default ReservationModel;