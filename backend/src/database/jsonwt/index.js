import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class JWTHandler {
    constructor(secret) {
        this.secret = secret;
        //this.blacklist = new Set();
    }
    generateToken(payload) {
        return jwt.sign(payload, this.secret, { expiresIn: "1h" });
    }
    verifyToken(token) {
        //if (this.blacklist.has(token)) return null;
        try {
            return jwt.verify(token, this.secret);
        } catch {
            return null;
        }
    }
}

export default new JWTHandler(process.env.JWT_SECRET_KEY);