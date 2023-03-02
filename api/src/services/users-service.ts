import bcrypt from 'bcrypt';
import { db } from '../utils/db';

interface UserProps {
  name: string,
  email: string,
  unique: string,
  password: string,
}

export function findUserByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

export function findUserByUnique(unique: string) {
  return db.user.findUnique({
    where: {
      unique,
    },
  });
}

export function createUserInDatabase(user: UserProps) {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

export function findUserById(id: string) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}