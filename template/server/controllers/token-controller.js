import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {StatusCodes} from "http-status-codes";
import {getUserByEmail} from "../database/database-manager-2.js";

const jwtSecret = 'ShhhhhItsASecret';

export async function postUser(req, res) {
    const user = req.body;
    console.log(user);

    // Generate a UUID for the new user
    user.userId = uuidv4();

    try {
        // Hash the password before storing it
        const saltRounds = 10; // You can adjust the salt rounds as needed
        user.password = await bcrypt.hash(user.password, saltRounds);

        // Insert the user with the hashed password
        db.insertUser(user);

        res.status(StatusCodes.CREATED).json({ message: "User created successfully." });
    } catch (error) {
        console.error('Error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to create user." });
    }
}


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
