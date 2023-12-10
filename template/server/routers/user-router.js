import express from 'express';

const router = express.Router();

import * as userController from '../controllers/user-controller.js';

router.get('/', userController.getListOfUsers)

router.get('/:email', userController.getUser);

router.delete('/:email', userController.deleteUser);

router.post('/', userController.postUser);

router.patch('/', userController.updateUserInformation);

export default router;
