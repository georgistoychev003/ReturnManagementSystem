import * as tokenController from '../controllers/token-controller.js';
import express from "express";

const router = express.Router();

router.post('/', tokenController.checkUserCredentials);

export default router;