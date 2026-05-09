type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitEntry>();

export function isRateLimited(
  key: string,
  options: {
    limit: number;
    windowMs: number;
  }
) {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, {
      count: 1,
      resetAt: now + options.windowMs,
    });
    return false;
  }

  current.count += 1;
  return current.count > options.limit;
}

export function getRateLimitKey(request: Request, scope: string) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0];
  const realIp = request.headers.get('x-real-ip');
  const ip = forwardedFor || realIp || 'local';

  return `${scope}:${ip}`;
}

export function isHoneypotFilled(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0;
}
