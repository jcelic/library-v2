import { z } from 'zod';
import { MIN_PASSWORD_SCORE, getPasswordScore } from '@/lib/password-strength';

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Full name is required')
      .max(100, 'Full name must be at most 100 characters long'),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, 'Email is required')
      .max(254, 'Email must be at most 254 characters long')
      .pipe(z.email('Please enter a valid email address')),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(64, 'Password must be at most 64 characters long'),

    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine(
    (data) =>
      getPasswordScore(data.password, [data.name, data.email]) >=
      MIN_PASSWORD_SCORE,
    {
      message: 'This password is too easy to guess',
      path: ['password'],
    },
  );

export type SignUpInput = z.infer<typeof signUpSchema>;
