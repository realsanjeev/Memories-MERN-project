import jwt from "jsonwebtoken";

const secret = "test";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomToken = token?.length < 500;
        console.log("auth", req.headers.authorization)

        let decodedData;
        if (token && isCustomToken) {
            decodedData = jwt.verify(token, secret);
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log(" err in auth");
    }
}

export default auth;