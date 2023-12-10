import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {StatusCodes} from "http-status-codes";

const jwtSecret = 'ShhhhhItsASecret';

export async function checkUserCredentials(req, res) {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
        const payload = {
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(payload, jwtSecret, {
            expiresIn: '1h'
        });

        res.status(StatusCodes.OK).json({ message: "Login successful!", token });
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid email or password." });
    }
}