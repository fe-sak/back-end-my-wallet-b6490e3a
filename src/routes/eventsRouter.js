import { Router } from 'express';
import * as controller from '../controllers/eventsController.js';
const eventsRouter = Router();

eventsRouter.post('/financial-events', controller.createEvent);

eventsRouter.get('/financial-events', controller.readEvents);

eventsRouter.get('/financial-events/sum', controller.readEventSum);

export default eventsRouter;
