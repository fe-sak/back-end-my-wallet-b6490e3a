import jwt from 'jsonwebtoken';
import * as services from '../services/eventsServices.js';

export async function createEvent(req, res) {
  const authorization = req.headers.authorization || '';
  const token = authorization.replace('Bearer ', '');

  if (!token) {
    return res.sendStatus(401);
  }

  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.sendStatus(401);
  }

  const { value, type } = req.body;

  if (!value || !type) {
    return res.sendStatus(422);
  }

  await services.createEvent({ type, value, user });

  res.sendStatus(201);
}

export async function readEvents(req, res) {
  const authorization = req.headers.authorization || '';
  const token = authorization.replace('Bearer ', '');

  if (!token) {
    return res.sendStatus(401);
  }

  let user;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.sendStatus(401);
  }

  const events = await services.readEvents(user);

  res.send(events.rows);
}

export async function readEventSum(req, res) {
  const authorization = req.headers.authorization || '';
  const token = authorization.replace('Bearer ', '');

  if (!token) {
    return res.sendStatus(401);
  }

  let user;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.sendStatus(401);
  }

  const events = await services.readEvents(user);

  const sum = services.EventsSum(events);

  res.send({ sum });
}
