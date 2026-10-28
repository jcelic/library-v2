'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@/generated/prisma/client';
import { BookStatus } from '@/generated/prisma/enums';
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

export type ActionResult =
  { success: true } | { success: false; error: string };

const setFavoriteSchema = z.object({
  id: z.uuid(),
  favorite: z.boolean(),
});

const setStatusSchema = z.object({
  id: z.uuid(),
  status: z.enum(BookStatus),
});

const deleteBookSchema = z.object({
  id: z.uuid(),
});

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

export const setFavorite = async (
  id: string,
  favorite: boolean,
): Promise<ActionResult> => {
  const user = await requireUser();

  const result = setFavoriteSchema.safeParse({ id, favorite });

  if (!result.success) {
    return { success: false, error: 'Invalid request' };
  }

  const { count } = await db.book.updateMany({
    where: { id: result.data.id, userId: user.id },
    data: { favorite: result.data.favorite },
  });

  if (count === 0) {
    return { success: false, error: 'Book not found' };
  }

  revalidatePath('/');

  return { success: true };
};

export const setStatus = async (
  id: string,
  status: BookStatus,
): Promise<ActionResult> => {
  const user = await requireUser();

  const result = setStatusSchema.safeParse({ id, status });

  if (!result.success) {
    return { success: false, error: 'Invalid request' };
  }

  const { count } = await db.book.updateMany({
    where: { id: result.data.id, userId: user.id },
    data: { status: result.data.status },
  });

  if (count === 0) {
    return { success: false, error: 'Book not found' };
  }

  revalidatePath('/');

  return { success: true };
};

export const deleteBook = async (id: string): Promise<ActionResult> => {
  const user = await requireUser();

  const result = deleteBookSchema.safeParse({ id });

  if (!result.success) {
    return { success: false, error: 'Invalid request' };
  }

  const { count } = await db.book.deleteMany({
    where: { id: result.data.id, userId: user.id },
  });

  if (count === 0) {
    return { success: false, error: 'Book not found' };
  }

  revalidatePath('/');

  return { success: true };
};
