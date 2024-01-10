import express from 'express';

const router = express.Router();

import * as userController from '../controllers/user-controller.js';

router.get('/', userController.getListOfUsers);

router.get('/count', userController.getCountOfUsers);


router.get('/:emailOrUserId', userController.getUser);

router.post('/', userController.postUser);

router.patch('/:emailOrUserId', userController.updateUserInformation);

router.delete('/:emailOrUserId', userController.deleteUser);


export default router;
