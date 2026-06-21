import { NextResponse } from 'next/server';
import { calculateCarbonImpact } from '@/lib/utils/carbon';

export async function POST(request: Request) {
  const body = await request.json();
  const { treeCount = 100, avgAge = 15, avgAbsorptionRate = 38 } = body;
  const result = calculateCarbonImpact(treeCount, avgAge, avgAbsorptionRate);
  return NextResponse.json(result);
}
