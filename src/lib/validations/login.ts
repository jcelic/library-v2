import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Email is required')
    .max(254, 'Email must be at most 254 characters long')
    .pipe(z.email('Please enter a valid email address')),

  password: z
    .string()
    .min(1, 'Password is required')
    .max(64, 'Password must be at most 64 characters long'),
});

export type LoginInput = z.infer<typeof loginSchema>;
