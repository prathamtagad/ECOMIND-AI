import { NextResponse } from 'next/server';
import { analyzeTreeImage } from '@/lib/utils/ai-analyzer';

export async function POST() {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 800));
  const result = analyzeTreeImage();
  return NextResponse.json(result);
}
