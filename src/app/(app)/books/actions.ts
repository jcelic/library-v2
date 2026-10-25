'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@/generated/prisma/client';
import { requireUser } from '@/lib/auth/session';
import { db } from '@/lib/db';
import { bookSchema } from '@/lib/validations/book';

export type CreateBookResult =
  | { success: true }
  | {
      success: false;
      errors: {
        title?: string[];
        subtitle?: string[];
        author?: string[];
        imageUrl?: string[];
        category?: string[];
        status?: string[];
        root?: string[];
      };
    };

export const createBook = async (
  values: unknown,
): Promise<CreateBookResult> => {
  const user = await requireUser();

  const result = bookSchema.safeParse(values);

  if (!result.success) {
    return {
      success: false,
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  try {
    await db.book.create({
      data: {
        ...result.data,
        subtitle: result.data.subtitle || null,
        imageUrl: result.data.imageUrl || null,
        userId: user.id,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return {
        success: false,
        errors: { root: ['You already have this book'] },
      };
    }

    throw error;
  }

  revalidatePath('/');

  return { success: true };
};
