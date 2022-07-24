import jwt from "jsonwebtoken";
const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"].substring(7);

    if (!token) {
        return res.json({ status: 401, statusMessage: "A valid token is required for authorization. Please login."});
    }

    try {
        const decoded = jwt.verify(token, config.ACCESS_TOKEN_KEY);
        req.user = decoded;
    } catch (e) {
        console.log(e)
        return res.json({ status: 403, statusMessage: "Invalid token."});
    }

    return next();
    
}

export default verifyToken;