import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    userType: { type: String, required: true }
});

const UserModel = model("User", UserSchema, "users");

export default UserModel;