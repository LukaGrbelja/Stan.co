import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    userType: { type: String, required: true },
    profilePicture: { type: String, required: true },
    additionalData: { type: Object }
});

const UserModel = model("User", UserSchema, "users");

export default UserModel;