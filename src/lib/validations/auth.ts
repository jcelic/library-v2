import { z } from 'zod';

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
  });

export type SignUpInput = z.infer<typeof signUpSchema>;
