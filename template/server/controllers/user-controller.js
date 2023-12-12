import * as databaseManager from '../database/database-manager-2.js';

export function getUser(req, res) {
    //TODO query the database for a specific user
    const userId = req.params.userId;
    const listOfUsers = databaseManager.getAllUsers();
    const userIdExists = listOfUsers.some(obj => Object.values(obj).includes(userId));
    if (userIdExists){
        const userFound = databaseManager.getUserById(userId);
        res
            .status(201)
            .json(
                {user : userFound});
    }
    else{
        res
            .status(404)
            .json({message : "The user with " + userId + "could not be found"})
    }
}

export function postUser() {
    //TODO query the database to post a user
}

export function updateUserInformation() {
    //TODO query the data base and update the user information
}


export function deleteUser(req, res) {
    //TODO query the database to delete a user
}

export function getListOfUsers(req, res){
    //TODO query the data base and return the list of users
    const listOfUsers  = databaseManager.getAllUsers();
    if (listOfUsers !== null){
        res
            .status(201)
            .json({
                listOfUser: databaseManager.getAllUsers()
            })
    }
    else{
        res
            .status(404)
            .json({
                message : "There are no users"
            })
    }
}