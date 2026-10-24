'use server';

import { redirect } from 'next/navigation';
import { verifyPassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';
import { db } from '@/lib/db';
import {
  getRateLimitMessage,
  loginEmailLimiter,
  loginIpLimiter,
} from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request';
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

  const ip = await getClientIp();
  const ipLimit = await loginIpLimiter.limit(ip);

  if (!ipLimit.success) {
    return { error: getRateLimitMessage(ipLimit.reset) };
  }

  const emailLimit = await loginEmailLimiter.limit(email);

  if (!emailLimit.success) {
    return { error: getRateLimitMessage(emailLimit.reset) };
  }

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
