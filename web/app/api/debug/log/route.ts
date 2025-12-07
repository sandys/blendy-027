import { NextRequest, NextResponse } from 'next/server';

/**
 * Debug logging endpoint - DEVELOPMENT ONLY
 * This endpoint is disabled in production for security
 */
export async function POST(req: NextRequest) {
  // Only allow in development mode
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { level = 'info', message, data } = body;

    // Validate inputs
    if (typeof message !== 'string' || message.length > 1000) {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    const validLevels = ['info', 'warn', 'error', 'debug'];
    const safeLevel = validLevels.includes(level) ? level : 'info';

    const timestamp = new Date().toISOString();
    const logMsg = `[CLIENT-LOG] ${timestamp} [${safeLevel.toUpperCase()}] ${message}`;

    if (safeLevel === 'error') {
      console.error(logMsg, data || '');
    } else {
      console.log(logMsg, data || '');
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
