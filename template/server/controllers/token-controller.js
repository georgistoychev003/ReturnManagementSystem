import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {StatusCodes} from "http-status-codes";
import {getUserByEmail} from "../database/database-manager-2.js";

const jwtSecret = 'ShhhhhItsASecret';


export async function checkUserCredentials(req, res) {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            const payload = {
                id: user.userID,
                email: user.email,
                role: user.userRole,
                userName : user.userName
            };

            const token = jwt.sign( payload, jwtSecret, {
                expiresIn: '1h'
            });

            res.status(StatusCodes.OK).json({ message: "Login successful!", token });
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid email or password." });
        }
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: "User not found." });
    }
}
