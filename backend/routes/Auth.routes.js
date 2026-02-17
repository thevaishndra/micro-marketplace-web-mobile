import express from 'express';
import {loginUser, registerUser} from '../controllers/Auth.controllers.js';

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;

//define routes for register and login