import 'server-only';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { env } from '@/lib/env';

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

export const loginIpLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '15 m'),
  prefix: 'ratelimit:login:ip',
});

export const loginEmailLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  prefix: 'ratelimit:login:email',
});

export const signupIpLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  prefix: 'ratelimit:signup:ip',
});

export const getRateLimitMessage = (reset: number) => {
  const minutes = Math.max(Math.ceil((reset - Date.now()) / 60_000), 1);

  return `Too many attempts. Try again in ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}.`;
};
