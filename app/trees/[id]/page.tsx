'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Tree } from '@/lib/types';
import {
  TreePine, MapPin, Heart, Droplets, Leaf, Ruler,
  Calendar, ArrowLeft, Activity, Wind
} from 'lucide-react';

const healthColorMap: Record<string, string> = {
  healthy: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  stressed: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  diseased: 'bg-red-500/15 text-red-400 border-red-500/25',
  critical: 'bg-red-600/15 text-red-500 border-red-600/25',
};

const healthBarColor: Record<string, string> = {
  healthy: 'bg-emerald-500',
  stressed: 'bg-amber-500',
  diseased: 'bg-red-500',
  critical: 'bg-red-600',
};

export default function TreeProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [tree, setTree] = useState<Tree | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/trees/${id}`)
      .then(r => r.json())
      .then(data => { setTree(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!tree) {
    return (
      <div className="text-center py-20">
        <TreePine size={48} className="mx-auto text-gray-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Tree Not Found</h2>
        <Link href="/map" className="text-primary-400 text-sm hover:underline">← Back to Map</Link>
      </div>
    );
  }

  const infoCards = [
    { icon: Ruler, label: 'Height', value: `${tree.height}m`, sub: `Trunk: ${tree.trunkDiameter}cm` },
    { icon: Droplets, label: 'Water Need', value: tree.waterNeed.toUpperCase(), sub: `Canopy: ${tree.canopySpread}m` },
    { icon: Leaf, label: 'CO₂ Absorbed', value: `${tree.carbonAbsorption} kg/yr`, sub: `O₂: ${tree.oxygenProduction} kg/yr` },
    { icon: Calendar, label: 'Age', value: `${tree.age} years`, sub: `Inspected: ${tree.lastInspection}` },
  ];

  return (
    <div>
      <Link href="/map" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Map
      </Link>

      {/* Header */}
      <div className="glass-card p-6 mb-6 animate-slide-up stagger-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-primary-600/15 flex items-center justify-center">
                <TreePine size={24} className="text-primary-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{tree.commonName}</h1>
                <p className="text-sm text-gray-400 italic">{tree.species}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
              <MapPin size={12} />
              <span>{tree.zone} · {tree.lat.toFixed(4)}, {tree.lng.toFixed(4)}</span>
              <span className="mx-2">·</span>
              <span>ID: {tree.id}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-xl border text-sm font-semibold ${healthColorMap[tree.healthStatus]}`}>
              {tree.healthStatus.charAt(0).toUpperCase() + tree.healthStatus.slice(1)}
            </div>
          </div>
        </div>
      </div>

      {/* Health Score Bar */}
      <div className="glass-card p-5 mb-6 animate-slide-up stagger-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Heart size={16} className="text-primary-400" />
            <span className="text-sm font-semibold text-white">Health Score</span>
          </div>
          <span className="text-2xl font-black text-white">{tree.healthScore}<span className="text-sm text-gray-500">/100</span></span>
        </div>
        <div className="h-3 bg-surface-300 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${healthBarColor[tree.healthStatus]}`}
            style={{ width: `${tree.healthScore}%` }}
          />
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {infoCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="glass-card p-4 animate-slide-up" style={{ animationDelay: `${0.3 + i * 0.1}s`, opacity: 0 }}>
              <Icon size={16} className="text-primary-400 mb-2" />
              <p className="text-xs text-gray-500">{card.label}</p>
              <p className="text-lg font-bold text-white mt-1">{card.value}</p>
              <p className="text-[10px] text-gray-600 mt-1">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* AI Recommendation */}
      <div className="glass-card p-5 animate-slide-up stagger-5">
        <div className="flex items-center gap-2 mb-3">
          <Activity size={16} className="text-cyan-400" />
          <span className="text-sm font-semibold text-white">AI Recommendation</span>
        </div>
        <div className="p-4 rounded-xl bg-surface-300/30 border border-primary-800/10">
          <p className="text-sm text-gray-300 leading-relaxed">{tree.recommendation}</p>
        </div>
      </div>
    </div>
  );
}
