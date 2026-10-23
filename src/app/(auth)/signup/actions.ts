'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { Prisma } from '@/generated/prisma/client';
import { hashPassword } from '@/lib/auth/password';
import { createSession } from '@/lib/auth/session';
import { db } from '@/lib/db';
import { signUpSchema } from '@/lib/validations/auth';

export type SignUpResult = {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
};

export const signUp = async (values: unknown): Promise<SignUpResult> => {
  const result = signUpSchema.safeParse(values);

  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }

  const { name, email, password } = result.data;

  const existingUser = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    return { errors: { email: ['An account with this email already exists'] } };
  }

  const passwordHash = await hashPassword(password);

  let userId: string;

  try {
    const newUser = await db.user.create({
      data: { name, email, passwordHash },
      select: { id: true },
    });

    userId = newUser.id;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return {
        errors: { email: ['An account with this email already exists'] },
      };
    }

    throw error;
  }

  await createSession(userId);

  redirect('/');
};
