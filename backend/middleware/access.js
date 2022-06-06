import jwt from "jsonwebtoken";
const config = process.env;

const accessToken = () => {
    try {
        const access = req.headers.authorization;

        const decoded = jwt.verify(token, config.ACCESS_TOKEN_KEY);
        req.user = decoded;

        
    } catch(e) {
        console.log(e)
    }
}