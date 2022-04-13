import connection from '../database.js';

export async function userAlreadyExists(email) {
  const existingUsers = await connection.query(
    `SELECT * FROM "users" WHERE "email"=$1`,
    [email]
  );

  return existingUsers;
}

export async function createUser({ name, email, hashedPassword }) {
  await connection.query(
    `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
    [name, email, hashedPassword]
  );
}
