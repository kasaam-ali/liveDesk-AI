const requestCounts = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 30;

export function rateLimit(ip) {
  const now = Date.now();
  const record = requestCounts.get(ip) || { count: 0, windowStart: now };

  if (now - record.windowStart > WINDOW_MS) {
    record.count = 0;
    record.windowStart = now;
  }

  record.count += 1;
  requestCounts.set(ip, record);

  return {
    allowed: record.count <= MAX_REQUESTS,
    remaining: Math.max(0, MAX_REQUESTS - record.count),
    resetAt: new Date(record.windowStart + WINDOW_MS).toISOString(),
  };
}
