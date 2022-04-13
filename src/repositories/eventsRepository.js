import connection from '../database.js';

export async function createEvent({ type, value, user }) {
  await connection.query(
    `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
    [user.id, value, type]
  );
}

export async function readEvents(user) {
  const events = await connection.query(
    `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
    [user.id]
  );

  return events;
}
