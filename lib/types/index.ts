// GreenPulse AI — Core TypeScript Types

export interface Tree {
  id: string;
  species: string;
  commonName: string;
  lat: number;
  lng: number;
  zone: string;
  healthScore: number;
  healthStatus: 'healthy' | 'stressed' | 'diseased' | 'critical';
  waterNeed: 'low' | 'medium' | 'high';
  carbonAbsorption: number; // kg CO2/year
  oxygenProduction: number; // kg O2/year
  age: number; // years
  height: number; // meters
  trunkDiameter: number; // cm
  canopySpread: number; // meters
  lastInspection: string; // ISO date
  recommendation: string;
  imageUrl: string;
}

export interface PollutionReading {
  id: string;
  zone: string;
  date: string;
  aqi: number;
  pm25: number;
  pm10: number;
  co2: number; // ppm
  no2: number;
  so2: number;
  lat: number;
  lng: number;
}

export interface PollutionZoneSummary {
  zone: string;
  avgAqi: number;
  avgPm25: number;
  avgPm10: number;
  avgCo2: number;
  treeCount: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'severe';
  lat: number;
  lng: number;
}

export interface AIAnalysisResult {
  id: string;
  classification: 'healthy' | 'stressed' | 'diseased' | 'critical';
  confidence: number; // 0-100
  findings: string[];
  recommendation: string;
  analyzedAt: string;
  processingTime: number; // ms
}

export interface PlantationRecommendation {
  species: string;
  commonName: string;
  suitabilityScore: number;
  rationale: string;
  growthRate: 'slow' | 'medium' | 'fast';
  carbonAbsorption: number; // kg CO2/year when mature
  waterRequirement: 'low' | 'medium' | 'high';
  maxHeight: number;
  nativeRegion: string;
  benefits: string[];
}

export interface CarbonCalculation {
  totalCarbonAbsorbed: number; // tonnes CO2/year
  totalOxygenProduced: number; // tonnes O2/year
  equivalentCarsOffset: number;
  equivalentFlights: number;
  coolingEffect: number; // degrees celsius
  stormwaterAbsorbed: number; // liters/year
  propertyValueIncrease: number; // percentage
  energySaved: number; // kWh/year
}

export interface DashboardStats {
  totalTrees: number;
  healthyTrees: number;
  stressedTrees: number;
  diseasedTrees: number;
  criticalTrees: number;
  averageAqi: number;
  totalCarbonCaptured: number; // tonnes/year
  totalOxygenProduced: number; // tonnes/year
  zonesMonitored: number;
  speciesCount: number;
}

export interface AdminAlert {
  id: string;
  type: 'health' | 'pollution' | 'inspection' | 'critical';
  title: string;
  description: string;
  zone: string;
  severity: 'info' | 'warning' | 'danger' | 'critical';
  timestamp: string;
  resolved: boolean;
  treeId?: string;
}

export interface Zone {
  id: string;
  name: string;
  lat: number;
  lng: number;
  radius: number; // km
  soilType: string;
  annualRainfall: number; // mm
  avgTemperature: number; // celsius
  pollutionLevel: 'low' | 'moderate' | 'high';
}

export interface SpeciesInfo {
  species: string;
  commonName: string;
  family: string;
  maxHeight: number;
  growthRate: 'slow' | 'medium' | 'fast';
  carbonAbsorption: number;
  oxygenProduction: number;
  waterRequirement: 'low' | 'medium' | 'high';
  sunRequirement: 'full' | 'partial' | 'shade';
  nativeRegion: string;
  benefits: string[];
  imageUrl: string;
}
