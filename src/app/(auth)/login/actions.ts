'use server';

import { redirect } from 'next/navigation';
import { verifyPassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';
import { db } from '@/lib/db';
import { loginSchema } from '@/lib/validations/login';

type LoginResult = {
  error: string;
};

const INVALID_CREDENTIALS_MESSAGE = 'Invalid email or password';

export const login = async (values: unknown): Promise<LoginResult> => {
  const result = loginSchema.safeParse(values);

  if (!result.success) {
    return { error: INVALID_CREDENTIALS_MESSAGE };
  }

  const { email, password } = result.data;

  const user = await db.user.findUnique({
    where: { email },
    select: { id: true, passwordHash: true },
  });

  if (!user) {
    return { error: INVALID_CREDENTIALS_MESSAGE };
  }

  const isPasswordValid = await verifyPassword(user.passwordHash, password);

  if (!isPasswordValid) {
    return { error: INVALID_CREDENTIALS_MESSAGE };
  }

  await createSession(user.id);

  redirect('/');
};
