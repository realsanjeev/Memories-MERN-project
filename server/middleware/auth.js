import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;

const auth = async (req, res, next) => {
    try {
        // Check if authorization header exists
        if (!req.headers.authorization) {
            return res.status(401).json({ message: "No authorization token provided" });
        }

        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Invalid authorization format" });
        }

        const isCustomToken = token.length < 500;

        let decodedData;
        if (isCustomToken) {
            // Verify custom JWT token
            decodedData = jwt.verify(token, secret);
            req.userId = decodedData?.id;
        } else {
            // Decode OAuth token (Google, etc.)
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        if (!req.userId) {
            return res.status(401).json({ message: "Invalid token" });
        }

        next();
    } catch (error) {
        console.log("Err in auth: ", error.message);
        return res.status(401).json({ message: "Authentication failed", error: error.message });
    }
}

export default auth;
