import * as db  from "../database/database-manager-2.js";
import {StatusCodes} from "http-status-codes";


export async function getUser(req, res) {
    const { emailOrUserId } = req.params;
    try {
        let user;
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUserId)) { // Check if emailOrUserId is an email
            user = db.getUserByEmail(emailOrUserId);
        } else {
            user = db.getUserById(emailOrUserId);
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
        const users = db.getAllUsers();
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve users." });
    }
}
