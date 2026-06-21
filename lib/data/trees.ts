import { Tree } from '@/lib/types';
import { speciesDatabase } from './species';
import { zones } from './zones';

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateTree(index: number): Tree {
  const zone = zones[index % zones.length];
  const sp = speciesDatabase[index % speciesDatabase.length];
  const healthOptions: Tree['healthStatus'][] = ['healthy', 'healthy', 'healthy', 'healthy', 'stressed', 'stressed', 'diseased', 'critical'];
  const status = healthOptions[index % healthOptions.length];
  const scoreMap = { healthy: 75 + (index % 20), stressed: 45 + (index % 15), diseased: 20 + (index % 15), critical: 5 + (index % 10) };
  const waterMap: Record<string, Tree['waterNeed']> = { low: 'low', medium: 'medium', high: 'high' };
  const age = 5 + (index * 3) % 50;
  const height = sp.maxHeight * (0.3 + (age / 60) * 0.7);
  const recs: Record<Tree['healthStatus'], string> = {
    healthy: 'Tree is in excellent condition. Continue regular maintenance and watering schedule.',
    stressed: 'Signs of water stress detected. Increase watering frequency and apply mulch around the base.',
    diseased: 'Fungal infection suspected. Apply appropriate fungicide and prune affected branches. Schedule follow-up inspection.',
    critical: 'Immediate intervention required. Severe structural damage or disease. Assess for safety risk and consider expert arborist consultation.',
  };
  const latOffset = (Math.sin(index * 7.3) * 0.02);
  const lngOffset = (Math.cos(index * 5.1) * 0.02);

  return {
    id: `TREE-${String(index + 1).padStart(4, '0')}`,
    species: sp.species,
    commonName: sp.commonName,
    lat: zone.lat + latOffset,
    lng: zone.lng + lngOffset,
    zone: zone.name,
    healthScore: Math.min(100, Math.max(0, scoreMap[status])),
    healthStatus: status,
    waterNeed: waterMap[sp.waterRequirement] || 'medium',
    carbonAbsorption: Math.round(sp.carbonAbsorption * (age / 30) * 10) / 10,
    oxygenProduction: Math.round(sp.oxygenProduction * (age / 30) * 10) / 10,
    age,
    height: Math.round(height * 10) / 10,
    trunkDiameter: Math.round(10 + age * 1.2),
    canopySpread: Math.round(height * 0.6 * 10) / 10,
    lastInspection: new Date(2026, 5, 1 + (index % 20)).toISOString().split('T')[0],
    recommendation: recs[status],
    imageUrl: sp.imageUrl,
  };
}

export const trees: Tree[] = Array.from({ length: 64 }, (_, i) => generateTree(i));

export function getTreeById(id: string): Tree | undefined {
  return trees.find(t => t.id === id);
}

export function getTreesByZone(zone: string): Tree[] {
  return trees.filter(t => t.zone === zone);
}

export function getTreesByHealth(status: Tree['healthStatus']): Tree[] {
  return trees.filter(t => t.healthStatus === status);
}
