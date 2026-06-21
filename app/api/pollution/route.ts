import { NextResponse } from 'next/server';
import { pollutionReadings, getZoneSummaries, getMonthlyAqiTrend } from '@/lib/data/pollution';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const view = searchParams.get('view');

  if (view === 'zones') return NextResponse.json(getZoneSummaries());
  if (view === 'trend') return NextResponse.json(getMonthlyAqiTrend());

  const zone = searchParams.get('zone');
  const readings = zone ? pollutionReadings.filter(r => r.zone === zone) : pollutionReadings;
  return NextResponse.json({ readings, total: readings.length });
}
