import connection from '../database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as services from '../services/authServices.js';

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.sendStatus(422);
  }

  await services.userAlreadyExists(email);

  await services.createUser({ name, email, password });

  res.sendStatus(201);
}

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(422);
    }

    const { rows } = await connection.query(
      `SELECT * FROM "users" WHERE "email"=$1`,
      [email]
    );
    const [user] = rows;

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.sendStatus(401);
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET
    );

    res.send({
      token,
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
