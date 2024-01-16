import express from 'express';

const router = express.Router();

import * as userController from '../controllers/user-controller.js';

router.get('/', userController.getListOfUsers);
router.get('/count', userController.getCountOfUsers);
router.get('/:emailOrUserId', userController.getUser);
router.post('/', userController.postUser);
router.patch('/:emailOrUserId', userController.updateUserInformation);
router.delete('/:emailOrUserId', userController.deleteUser);
router.delete('/users/:userID', userController.deleteUser);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);
router.post('/refund', userController.refundMail);
router.post('/damaged', userController.damagedMail);

export default router;
