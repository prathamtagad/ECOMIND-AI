'use client';

import { useState } from 'react';
import PageHeader from '@/components/layout/page-header';
import { Sprout, MapPin, Droplets, TrendingUp, Leaf, ChevronDown } from 'lucide-react';
import { PlantationRecommendation } from '@/lib/types';
import { zones } from '@/lib/data/zones';

export default function PlantationPage() {
  const [selectedZone, setSelectedZone] = useState('');
  const [recs, setRecs] = useState<PlantationRecommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecs = (zoneName: string) => {
    setSelectedZone(zoneName);
    if (!zoneName) { setRecs([]); return; }
    setLoading(true);
    fetch(`/api/recommendations/${encodeURIComponent(zoneName)}`)
      .then(r => r.json())
      .then(data => { setRecs(data); setLoading(false); });
  };

  const zone = zones.find(z => z.name === selectedZone);

  return (
    <div>
      <PageHeader title="Plantation Recommendations" subtitle="AI-powered species suggestions optimized for each zone" />

      {/* Zone Selector */}
      <div className="glass-card p-5 mb-6 animate-slide-up stagger-1">
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={16} className="text-primary-400" />
          <span className="text-sm font-semibold text-white">Select Zone</span>
        </div>
        <div className="relative">
          <select
            value={selectedZone}
            onChange={e => fetchRecs(e.target.value)}
            className="w-full bg-surface-300 border border-primary-800/20 rounded-xl px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-primary-500 cursor-pointer"
          >
            <option value="">Choose a zone to get recommendations...</option>
            {zones.map(z => (
              <option key={z.id} value={z.name}>{z.name} — {z.pollutionLevel} pollution, {z.soilType} soil</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        {zone && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="p-3 rounded-lg bg-surface-300/30">
              <p className="text-[10px] text-gray-500">Soil Type</p>
              <p className="text-sm font-semibold text-white">{zone.soilType}</p>
            </div>
            <div className="p-3 rounded-lg bg-surface-300/30">
              <p className="text-[10px] text-gray-500">Rainfall</p>
              <p className="text-sm font-semibold text-white">{zone.annualRainfall}mm/yr</p>
            </div>
            <div className="p-3 rounded-lg bg-surface-300/30">
              <p className="text-[10px] text-gray-500">Avg Temp</p>
              <p className="text-sm font-semibold text-white">{zone.avgTemperature}°C</p>
            </div>
            <div className="p-3 rounded-lg bg-surface-300/30">
              <p className="text-[10px] text-gray-500">Pollution</p>
              <p className={`text-sm font-semibold ${zone.pollutionLevel === 'high' ? 'text-red-400' : zone.pollutionLevel === 'moderate' ? 'text-amber-400' : 'text-emerald-400'}`}>
                {zone.pollutionLevel.charAt(0).toUpperCase() + zone.pollutionLevel.slice(1)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Recommendations */}
      {!loading && recs.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-400">{recs.length} species recommended for <span className="text-white font-medium">{selectedZone}</span></p>
          <div className="grid md:grid-cols-2 gap-4">
            {recs.map((rec, i) => (
              <div key={i} className="glass-card glass-card-hover p-5 transition-all animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{rec.commonName}</h3>
                    <p className="text-xs text-gray-500 italic">{rec.species}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-primary-400">{rec.suitabilityScore}</p>
                    <p className="text-[10px] text-gray-500">Suitability</p>
                  </div>
                </div>

                {/* Score bar */}
                <div className="h-1.5 bg-surface-300 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full" style={{ width: `${rec.suitabilityScore}%` }} />
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <TrendingUp size={12} className="text-primary-400" />
                    {rec.growthRate}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Leaf size={12} className="text-emerald-400" />
                    {rec.carbonAbsorption} kg/yr
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Droplets size={12} className="text-cyan-400" />
                    {rec.waterRequirement}
                  </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-3">{rec.rationale}</p>

                <div className="flex flex-wrap gap-1.5">
                  {rec.benefits.map((b, j) => (
                    <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-primary-600/10 text-primary-400 border border-primary-600/15">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && !selectedZone && (
        <div className="text-center py-20">
          <Sprout size={48} className="mx-auto text-gray-700 mb-4" />
          <p className="text-sm text-gray-500">Select a zone above to get AI-powered plantation recommendations</p>
        </div>
      )}
    </div>
  );
}
