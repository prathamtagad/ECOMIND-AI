import { NextResponse } from 'next/server';
import { trees } from '@/lib/data/trees';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zone = searchParams.get('zone');
  const health = searchParams.get('health');
  const species = searchParams.get('species');

  let filtered = [...trees];
  if (zone) filtered = filtered.filter(t => t.zone === zone);
  if (health) filtered = filtered.filter(t => t.healthStatus === health);
  if (species) filtered = filtered.filter(t => t.commonName === species);

  return NextResponse.json({ trees: filtered, total: filtered.length });
}
