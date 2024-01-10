import * as db  from "../database/database-manager-2.js";
import * as queries from "../database/database-queries.js";
import {StatusCodes} from "http-status-codes";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {getUserByEmail, updateUserPasswordById} from "../database/database-manager-2.js";


export async function getUser(req, res) {
    const { emailOrUserId } = req.params;
    try {
        let user;
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUserId)) { // Check if emailOrUserId is an email
            user = getUserByEmail(emailOrUserId);
        } else {
            user = getUserById(emailOrUserId);
        }
        if (user) {
            res.status(StatusCodes.OK).json(user);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "User not found." });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve user." });
    }
}

export async  function postUser(req, res) {
    const user = req.body;
    console.log(user);

    // Generate a UUID for the new user
    const userId = uuidv4();
    user.userId = userId;
    console.log(user.userId)
    try {
        db.insertUser(user);

        res.status(StatusCodes.CREATED).json({ message: "User created successfully." });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "INTERNAL_SERVER_ERROR Failed to create user." });
    }
}


export async function updateUserInformation(req, res) {
    const { emailOrUserId } = req.params;
    const userData = req.body;
    try {
        let updateResult;
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUserId)) { // Check if emailOrUserId is an email
            db.updateUserByEmail(emailOrUserId, userData);
        } else {
            db.updateUserById(emailOrUserId, userData);
        }
        res.status(StatusCodes.OK).json({ message: "User updated successfully." });

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to update user." });
    }
}

export async function deleteUser(req, res) {
    const { emailOrUserId } = req.params;
    try {
        let deleteResult;
        if (typeof emailOrUserId === 'string') {
            deleteResult = db.deleteUserByEmail(emailOrUserId);
        } else if (typeof emailOrUserId === 'number') {
            deleteResult = db.deleteUserById(emailOrUserId);
        }
        if(db.getUserById(emailOrUserId)){
            res.status(StatusCodes.OK).json({ message: "User deleted successfully." });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "User not found." });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete user." });
    }
}

export async function getListOfUsers(req, res){
    try {
        const users = getAllUsers();
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve users." });
    }
}



const jwtSecret = 'ShhhhhItsASecret'; //we need to replace this with a, environment-specific variable

export async function forgotPassword(req, res) {
    const { email } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found.' });
        }

        const payload = {
            userId: user.userId,
            email: user.email
        };

        const resetToken = jwt.sign(payload, jwtSecret, {
            expiresIn: '1h'
        });

        const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;


        // Nodemailer setup
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mitkopetrovich2021@gmail.com', // our test email sender
                pass: 'kdml xmqm osug vzks'
            }
        });

        let mailOptions = {
            from: 'mitkopetrovich2021@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: 'Please follow the link to reset your password.',
            html: `<p>Dear customer, please follow <a href="${resetUrl}">this link</a> to reset your password.</p>`
        };

        await transporter.sendMail(mailOptions);

        res.status(StatusCodes.OK).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to send password reset email.' });
    }
}

export async function resetPassword(req, res) {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, jwtSecret);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        const updateResult = updateUserPasswordById(decoded.userId, hashedPassword);
        if (updateResult) {
            res.status(StatusCodes.OK).json({ message: 'Password successfully reset.' });
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error updating password.' });
        }
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid or expired token.' });
    }
}