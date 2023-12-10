import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { usersData } from '../data/init-data.js';

const jwtSecret = 'ShhhhhItsASecret';

export const isLoggedIn = (req, res, next) => {
    const token = authenticateToken(req);
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ Error: "No token provided" });
    }

    try {
        const payload = jwt.verify(token, jwtSecret);

        if (!payload) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ Error: "Invalid token" });
        }

        const user = usersData.find(user => user.email === payload.email);
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ Error: "User not found" });
        }

        req.user = user;
        next();

    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({ Error: "Not logged in or invalid token" });
    }
};

export function authenticateToken(req) {
    const authHeader = req.headers['authorization'];
    return authHeader && authHeader.split(' ')[1];
}
