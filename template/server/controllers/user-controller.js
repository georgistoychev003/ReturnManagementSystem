import {
    deleteUserByEmail, deleteUserById, getAllUsers,
    getUserByEmail,
    getUserById,
    updateUserByEmail,
    updateUserById
} from "../database/database-manager-2.js";
import * as queries from "../database/database-queries.js";
import {StatusCodes} from "http-status-codes";
import db from "better-sqlite3";

export async function getUser(req, res) {
    //TODO get a user
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
    //TODO query the database to update a user
    const { email, password, userRole, isAdmin } = req.body;
    try {
        const createUserResult = db.prepare(queries.createUser).run(email, password, userRole, isAdmin);
        if (createUserResult.changes > 0) {
            res.status(StatusCodes.CREATED).json({ message: "User created successfully." });
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Failed to create user." });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to create user." });
    }
}


export async function updateUserInformation(req, res) {
    //TODO update the user information
    const { emailOrUserId } = req.params;
    const userData = req.body;
    try {
        let updateResult;
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUserId)) { // Check if emailOrUserId is an email
            updateResult = updateUserByEmail(emailOrUserId, userData);
        } else {
            updateResult = updateUserById(emailOrUserId, userData);
        }
        if (updateResult.changes > 0) {
            res.status(StatusCodes.OK).json({ message: "User updated successfully." });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "User not found." });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to update user." });
    }
}

export async function deleteUser(req, res) {
    //TODO delete a user
    const { emailOrUserId } = req.params;
    try {
        let deleteResult;
        if (typeof emailOrUserId === 'string') {
            deleteResult = deleteUserByEmail(emailOrUserId);
        } else if (typeof emailOrUserId === 'number') {
            deleteResult = deleteUserById(emailOrUserId);
        }
        if (deleteResult.changes > 0) {
            res.status(StatusCodes.OK).json({ message: "User deleted successfully." });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "User not found." });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete user." });
    }
}

export async function getListOfUsers(req, res){
    //TODO get a list of users
    try {
        const users = getAllUsers();
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve users." });
    }
}