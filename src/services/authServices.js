import ConflictError from '../errors/Conflict.js';
import bcrypt from 'bcrypt';
import * as repository from '../repositories/authRepository.js';

export async function userAlreadyExists(email) {
  const existingUsers = await repository.userAlreadyExists(email);

  if (existingUsers.rowCount > 0) {
    console.log('conflito!');
    throw ConflictError('User');
  }
}

export async function createUser({ name, email, password }) {
  const hashedPassword = bcrypt.hashSync(password, 12);

  await repository.createUser({ name, email, hashedPassword });
}
