'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/layout/page-header';
import { Calculator, Leaf, Wind, Car, Plane, Thermometer, Droplets, Zap, Home } from 'lucide-react';
import { CarbonCalculation } from '@/lib/types';

export default function CarbonPage() {
  const [treeCount, setTreeCount] = useState(200);
  const [avgAge, setAvgAge] = useState(15);
  const [result, setResult] = useState<CarbonCalculation | null>(null);

  useEffect(() => {
    fetch('/api/carbon/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ treeCount, avgAge }),
    })
      .then(r => r.json())
      .then(setResult);
  }, [treeCount, avgAge]);

  const impactCards = result ? [
    { icon: Leaf, label: 'CO₂ Absorbed', value: `${result.totalCarbonAbsorbed}`, unit: 'tonnes/year', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { icon: Wind, label: 'O₂ Produced', value: `${result.totalOxygenProduced}`, unit: 'tonnes/year', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { icon: Car, label: 'Cars Offset', value: `${result.equivalentCarsOffset}`, unit: 'vehicles/year', color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { icon: Plane, label: 'Flights Offset', value: `${result.equivalentFlights}`, unit: 'Delhi→Mumbai', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { icon: Thermometer, label: 'Cooling Effect', value: `${result.coolingEffect}°C`, unit: 'temperature reduction', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { icon: Droplets, label: 'Stormwater', value: `${(result.stormwaterAbsorbed / 1000).toFixed(0)}K`, unit: 'liters/year', color: 'text-teal-400', bg: 'bg-teal-500/10' },
    { icon: Home, label: 'Property Value', value: `+${result.propertyValueIncrease}%`, unit: 'value increase', color: 'text-pink-400', bg: 'bg-pink-500/10' },
    { icon: Zap, label: 'Energy Saved', value: `${result.energySaved.toLocaleString()}`, unit: 'kWh/year', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  ] : [];

  return (
    <div>
      <PageHeader title="Carbon Impact Calculator" subtitle="Quantify the environmental value of your city's green cover" />

      {/* Input Controls */}
      <div className="glass-card p-6 mb-8 animate-slide-up stagger-1">
        <div className="flex items-center gap-2 mb-6">
          <Calculator size={18} className="text-primary-400" />
          <h3 className="font-semibold text-white">Configure Parameters</h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-400">Number of Trees</label>
              <span className="text-sm font-bold text-primary-400">{treeCount}</span>
            </div>
            <input
              type="range" min={10} max={5000} step={10} value={treeCount}
              onChange={e => setTreeCount(Number(e.target.value))}
              className="w-full h-2 bg-surface-300 rounded-full appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-[10px] text-gray-600 mt-1">
              <span>10</span><span>5,000</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-400">Average Tree Age</label>
              <span className="text-sm font-bold text-primary-400">{avgAge} years</span>
            </div>
            <input
              type="range" min={1} max={50} step={1} value={avgAge}
              onChange={e => setAvgAge(Number(e.target.value))}
              className="w-full h-2 bg-surface-300 rounded-full appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-[10px] text-gray-600 mt-1">
              <span>1 year</span><span>50 years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Grid */}
      {result && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {impactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="glass-card glass-card-hover p-5 transition-all animate-slide-up" style={{ animationDelay: `${0.2 + i * 0.08}s` }}>
                <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
                  <Icon size={20} className={card.color} />
                </div>
                <p className="text-xs text-gray-500 mb-1">{card.label}</p>
                <p className="text-2xl font-black text-white">{card.value}</p>
                <p className="text-[10px] text-gray-600 mt-1">{card.unit}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Equivalency callout */}
      {result && (
        <div className="glass-card p-6 mt-8 text-center glow-green animate-slide-up stagger-5">
          <p className="text-sm text-gray-400 mb-2">Environmental Equivalency</p>
          <p className="text-xl sm:text-2xl font-bold text-white">
            {treeCount} trees absorb the CO₂ equivalent of taking{' '}
            <span className="text-primary-400">{result.equivalentCarsOffset} cars</span>{' '}
            off the road every year
          </p>
        </div>
      )}
    </div>
  );
}
