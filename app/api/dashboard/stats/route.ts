import { NextResponse } from 'next/server';
import { trees } from '@/lib/data/trees';
import { pollutionReadings } from '@/lib/data/pollution';
import { DashboardStats } from '@/lib/types';

export async function GET() {
  const stats: DashboardStats = {
    totalTrees: trees.length,
    healthyTrees: trees.filter(t => t.healthStatus === 'healthy').length,
    stressedTrees: trees.filter(t => t.healthStatus === 'stressed').length,
    diseasedTrees: trees.filter(t => t.healthStatus === 'diseased').length,
    criticalTrees: trees.filter(t => t.healthStatus === 'critical').length,
    averageAqi: Math.round(pollutionReadings.reduce((sum, r) => sum + r.aqi, 0) / pollutionReadings.length),
    totalCarbonCaptured: Math.round(trees.reduce((sum, t) => sum + t.carbonAbsorption, 0) / 1000 * 100) / 100,
    totalOxygenProduced: Math.round(trees.reduce((sum, t) => sum + t.oxygenProduction, 0) / 1000 * 100) / 100,
    zonesMonitored: new Set(trees.map(t => t.zone)).size,
    speciesCount: new Set(trees.map(t => t.species)).size,
  };
  return NextResponse.json(stats);
}
