import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { UserController } from '../controllers/user.controller.js';


const router = express.Router();
const userController = new UserController();
router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/userinfo/:username', authMiddleware, userController.getUserInfo);

export default router;
