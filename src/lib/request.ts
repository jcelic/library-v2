import 'server-only';
import { headers } from 'next/headers';

export const getClientIp = async () => {
  const headerList = await headers();
  const forwardedFor = headerList.get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  return headerList.get('x-real-ip') ?? 'unknown';
};
