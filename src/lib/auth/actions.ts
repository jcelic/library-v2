'use server';

import { redirect } from 'next/navigation';
import { deleteSession } from '@/lib/auth/session';

export const logout = async () => {
  await deleteSession();

  redirect('/login');
};
