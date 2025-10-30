import { Schema, model } from "mongoose";

const ApartmentSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    locationCode: { type: String }, // Google maps API data ///oce li kod sam sadrzavat tocne detalje o lokaciji???
    address: { type: String, required: true },
    hood: { type: String, required: true },
    livingArea: { type: Number, required: true },
    numOfBeds: { type: Number, required: true },
    numOfRooms: { type: Number, required: true },
    pictures: [{ type: String }],
    addEquip: [{ type: String }],
    description: { type: String}
});

const ApartmentModel = model("apartments", ApartmentSchema);

export default ApartmentModel;