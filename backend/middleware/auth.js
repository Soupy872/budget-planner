import jwt from "jsonwebtoken";
const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers["Authorization"].substring(7);

    if (!token) {
        return res.status(403).send("A valid token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (e) {
        return res.status(401).send("Invalid Token");
    }

    return next();
}

export default verifyToken;