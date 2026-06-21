import { NextResponse } from 'next/server';
import { getRecommendations } from '@/lib/utils/recommendations';

export async function GET(_request: Request, { params }: { params: Promise<{ zone: string }> }) {
  const { zone } = await params;
  const recs = getRecommendations(decodeURIComponent(zone));
  return NextResponse.json(recs);
}
