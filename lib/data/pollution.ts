import { PollutionReading, PollutionZoneSummary } from '@/lib/types';
import { zones } from './zones';

function generateReadings(): PollutionReading[] {
  const readings: PollutionReading[] = [];
  let id = 1;
  for (const zone of zones) {
    for (let day = 1; day <= 30; day++) {
      const base = zone.pollutionLevel === 'high' ? 160 : zone.pollutionLevel === 'moderate' ? 100 : 55;
      const variation = Math.sin(day * 0.5) * 20 + Math.cos(day * 0.3) * 10;
      readings.push({
        id: `PR-${String(id++).padStart(4, '0')}`,
        zone: zone.name,
        date: `2026-06-${String(day).padStart(2, '0')}`,
        aqi: Math.round(base + variation + Math.random() * 15),
        pm25: Math.round((base * 0.4 + variation * 0.3) + Math.random() * 8),
        pm10: Math.round((base * 0.6 + variation * 0.4) + Math.random() * 12),
        co2: Math.round(380 + base * 0.5 + Math.random() * 20),
        no2: Math.round(15 + base * 0.08 + Math.random() * 5),
        so2: Math.round(5 + base * 0.03 + Math.random() * 3),
        lat: zone.lat + (Math.random() - 0.5) * 0.01,
        lng: zone.lng + (Math.random() - 0.5) * 0.01,
      });
    }
  }
  return readings;
}

export const pollutionReadings: PollutionReading[] = generateReadings();

export function getZoneSummaries(): PollutionZoneSummary[] {
  return zones.map(zone => {
    const zoneReadings = pollutionReadings.filter(r => r.zone === zone.name);
    const avg = (arr: number[]) => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
    const avgAqi = avg(zoneReadings.map(r => r.aqi));
    return {
      zone: zone.name,
      avgAqi,
      avgPm25: avg(zoneReadings.map(r => r.pm25)),
      avgPm10: avg(zoneReadings.map(r => r.pm10)),
      avgCo2: avg(zoneReadings.map(r => r.co2)),
      treeCount: 8, // will be calculated in API
      riskLevel: avgAqi > 150 ? 'severe' : avgAqi > 100 ? 'high' : avgAqi > 60 ? 'moderate' : 'low',
      lat: zone.lat,
      lng: zone.lng,
    };
  });
}

export function getMonthlyAqiTrend(): { date: string; aqi: number; pm25: number; pm10: number }[] {
  const daily: Record<string, { aqi: number[]; pm25: number[]; pm10: number[] }> = {};
  for (const r of pollutionReadings) {
    if (!daily[r.date]) daily[r.date] = { aqi: [], pm25: [], pm10: [] };
    daily[r.date].aqi.push(r.aqi);
    daily[r.date].pm25.push(r.pm25);
    daily[r.date].pm10.push(r.pm10);
  }
  return Object.entries(daily).map(([date, vals]) => ({
    date: date.slice(5), // "06-01"
    aqi: Math.round(vals.aqi.reduce((a, b) => a + b, 0) / vals.aqi.length),
    pm25: Math.round(vals.pm25.reduce((a, b) => a + b, 0) / vals.pm25.length),
    pm10: Math.round(vals.pm10.reduce((a, b) => a + b, 0) / vals.pm10.length),
  })).sort((a, b) => a.date.localeCompare(b.date));
}
