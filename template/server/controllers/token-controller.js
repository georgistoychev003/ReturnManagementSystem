import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {StatusCodes} from "http-status-codes";
import {getUserByEmail} from "../database/database-manager-2.js";

const jwtSecret = 'ShhhhhItsASecret';

export async function checkUserCredentials(req, res) {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    console.log(email)
    console.log(user)

    // await bcrypt.compare(password, user.password)

    if (user && password===user.password) {
        const payload = {
            id: user.userID,
            email: user.email,
            role: user.userRole,
            userName : user.userName
        };

        const token = jwt.sign(payload, jwtSecret, {
            expiresIn: '1h'
        });

        res.status(StatusCodes.OK).json({ message: "Login successful!", token });
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid email or password." });
    }
}