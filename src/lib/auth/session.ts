import 'server-only';
import { createHash, randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { env } from '@/lib/env';
import { cache } from 'react';

type CurrentUser = {
  id: string;
  name: string;
  email: string;
};

const SESSION_COOKIE_NAME = 'session';
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

export const generateSessionToken = (): string => {
  return randomBytes(32).toString('base64url');
};

export const hashToken = (token: string): string => {
  return createHash('sha256').update(token).digest('hex');
};

export const createSession = async (userId: string): Promise<void> => {
  const token = generateSessionToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await db.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
};

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const cookieStore = await cookies();

  const cookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!cookie?.value) {
    return null;
  }

  const tokenHash = hashToken(cookie.value);

  const session = await db.session.findUnique({
    where: { tokenHash },
    select: {
      expiresAt: true,
      user: { select: { id: true, name: true, email: true } },
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt < new Date()) {
    await db.session.deleteMany({ where: { tokenHash } });
    return null;
  }

  return session.user;
});

export const deleteSession = async () => {
  const cookieStore = await cookies();

  const cookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (cookie?.value) {
    const tokenHash = hashToken(cookie.value);
    await db.session.deleteMany({ where: { tokenHash } });
    cookieStore.delete(SESSION_COOKIE_NAME);
  }
};
