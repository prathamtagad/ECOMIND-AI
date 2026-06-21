import { CarbonCalculation } from '@/lib/types';

export function calculateCarbonImpact(
  treeCount: number,
  avgAge: number,
  avgAbsorptionRate: number = 38
): CarbonCalculation {
  const maturityFactor = Math.min(1, avgAge / 25);
  const totalCarbonAbsorbed = Math.round((treeCount * avgAbsorptionRate * maturityFactor) / 1000 * 100) / 100;
  const totalOxygenProduced = Math.round(totalCarbonAbsorbed * 0.73 * 100) / 100;
  const equivalentCarsOffset = Math.round(totalCarbonAbsorbed / 4.6 * 10) / 10;
  const equivalentFlights = Math.round(totalCarbonAbsorbed / 0.9 * 10) / 10;
  const coolingEffect = Math.round(treeCount * 0.04 * maturityFactor * 10) / 10;
  const stormwaterAbsorbed = Math.round(treeCount * 15000 * maturityFactor);
  const propertyValueIncrease = Math.round(Math.min(15, treeCount * 0.02 * maturityFactor) * 10) / 10;
  const energySaved = Math.round(treeCount * 56 * maturityFactor);

  return {
    totalCarbonAbsorbed,
    totalOxygenProduced,
    equivalentCarsOffset,
    equivalentFlights,
    coolingEffect,
    stormwaterAbsorbed,
    propertyValueIncrease,
    energySaved,
  };
}
