import { Router } from 'express';
import * as controller from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/sign-up', controller.signUp);
authRouter.post('/sign-in', controller.signIn);

export default authRouter;
