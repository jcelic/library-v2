import { z } from 'zod';
import { BookCategory, BookStatus } from '@/generated/prisma/enums';

export const bookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must be at most 200 characters long'),

  subtitle: z
    .string()
    .trim()
    .max(200, 'Subtitle must be at most 200 characters long'),

  author: z
    .string()
    .trim()
    .min(1, 'Author is required')
    .max(100, 'Author must be at most 100 characters long'),

  imageUrl: z
    .string()
    .trim()
    .max(2048, 'Image link must be at most 2048 characters long')
    .pipe(
      z.literal('').or(
        z.url({
          protocol: /^https$/,
          error: 'Enter a valid https image link',
        }),
      ),
    ),

  category: z.enum(BookCategory, { error: 'Please choose a category' }),

  status: z.enum(BookStatus),
});

export type BookInput = z.infer<typeof bookSchema>;
