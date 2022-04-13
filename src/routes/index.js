import { Router } from 'express';
import authRouter from './authRouter.js';
import eventsRouter from './eventsRouter.js';

const router = Router();

router.use(authRouter);
router.use(eventsRouter);

export default router;
