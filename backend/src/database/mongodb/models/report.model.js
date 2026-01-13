import { Schema, model } from "mongoose";

const ReportSchema = new Schema({
    reportedUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const ReportModel = model("reports", ReportSchema);

export default ReportModel;