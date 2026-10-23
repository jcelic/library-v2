import 'server-only';
import { argon2id, hash, verify, type HashOptions } from 'argon2';

const hashOptions: HashOptions = {
  type: argon2id,
  memoryCost: 19 * 1024,
  timeCost: 2,
  parallelism: 1,
};

export const hashPassword = (password: string): Promise<string> => {
  return hash(password, hashOptions);
};

export const verifyPassword = (
  passwordHash: string,
  password: string,
): Promise<boolean> => {
  return verify(passwordHash, password);
};
