import { PlantationRecommendation } from '@/lib/types';
import { speciesDatabase } from '@/lib/data/species';
import { zones } from '@/lib/data/zones';

export function getRecommendations(zoneId: string): PlantationRecommendation[] {
  const zone = zones.find(z => z.id === zoneId || z.name === zoneId);
  if (!zone) return [];

  return speciesDatabase.map(sp => {
    let score = 50;
    // Pollution tolerance bonus
    if (zone.pollutionLevel === 'high' && sp.waterRequirement === 'low') score += 15;
    if (zone.pollutionLevel === 'high' && ['Neem', 'Peepal', 'Arjuna'].includes(sp.commonName)) score += 20;
    // Water match
    if (zone.annualRainfall < 950 && sp.waterRequirement === 'low') score += 10;
    if (zone.annualRainfall >= 950 && sp.waterRequirement !== 'high') score += 5;
    // Growth rate bonus for urban areas
    if (sp.growthRate === 'fast') score += 10;
    // Carbon absorption bonus
    score += Math.round(sp.carbonAbsorption / 5);
    // Native species bonus
    if (sp.nativeRegion.includes('Indian')) score += 8;
    score = Math.min(98, score);

    const rationales: string[] = [];
    if (zone.pollutionLevel === 'high') rationales.push(`Excellent air purification capability for high-pollution zone`);
    if (sp.growthRate === 'fast') rationales.push(`Fast growth rate ensures quick canopy establishment`);
    if (sp.carbonAbsorption > 40) rationales.push(`High carbon absorption rate of ${sp.carbonAbsorption} kg CO₂/year`);
    if (sp.waterRequirement === 'low') rationales.push(`Low water requirement suits ${zone.soilType} soil conditions`);
    if (sp.nativeRegion.includes('Indian')) rationales.push(`Native species well-adapted to local climate`);
    if (rationales.length === 0) rationales.push(`Suitable species for ${zone.name} zone conditions`);

    return {
      species: sp.species,
      commonName: sp.commonName,
      suitabilityScore: score,
      rationale: rationales.join('. ') + '.',
      growthRate: sp.growthRate,
      carbonAbsorption: sp.carbonAbsorption,
      waterRequirement: sp.waterRequirement,
      maxHeight: sp.maxHeight,
      nativeRegion: sp.nativeRegion,
      benefits: sp.benefits,
    };
  }).sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}
