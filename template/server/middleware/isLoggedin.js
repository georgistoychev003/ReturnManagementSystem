import jwt from 'jsonwebtoken';
import users from "../data/users.js";


export const isLoggedIn = (req, res, next) => {
    const token = authenticateToken(req);
    const payload = isToken(token);

    if (payload) {
        req.payload = payload;
        next();
    } else{
        res.status(401).send({Error: "Not logged in"})
    }
}

export function authenticateToken(req) {
    const authHeader = req.headers['Authorization'];
    return authHeader && authHeader.split(' ')[1];
}

export const isToken = (token) => {
    const payLoad = jwt.decode(token);
    console.log(payLoad);
    const findUser = users.find(user => user.email === payLoad.email)
    if (findUser) {
        try {
            return jwt.verify(token, findUser.jwt_secret)
        } catch (err) {
            return false;
        }
    }
    return false;
}
