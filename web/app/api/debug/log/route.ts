import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { level = 'info', message, data } = body;
  
  const timestamp = new Date().toISOString();
  const logMsg = `[CLIENT-LOG] ${timestamp} [${level.toUpperCase()}] ${message}`;
  
  if (level === 'error') {
    console.error(logMsg, data || '');
  } else {
    console.log(logMsg, data || '');
  }
  
  return NextResponse.json({ ok: true });
}
