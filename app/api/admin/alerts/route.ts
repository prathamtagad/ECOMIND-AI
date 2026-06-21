import { NextResponse } from 'next/server';
import { alerts } from '@/lib/data/alerts';

export async function GET() {
  return NextResponse.json(alerts);
}
