'use client';

import { useEffect, useState } from 'react';
import PageHeader from '@/components/layout/page-header';
import { CloudRain, Wind, AlertTriangle, TrendingUp } from 'lucide-react';
import { PollutionZoneSummary } from '@/lib/types';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';

export default function PollutionPage() {
  const [trend, setTrend] = useState<{ date: string; aqi: number; pm25: number; pm10: number }[]>([]);
  const [zones, setZones] = useState<PollutionZoneSummary[]>([]);

  useEffect(() => {
    fetch('/api/pollution?view=trend').then(r => r.json()).then(setTrend);
    fetch('/api/pollution?view=zones').then(r => r.json()).then(setZones);
  }, []);

  const riskColors: Record<string, string> = {
    low: 'text-emerald-400 bg-emerald-500/10', moderate: 'text-amber-400 bg-amber-500/10',
    high: 'text-red-400 bg-red-500/10', severe: 'text-red-500 bg-red-600/10',
  };

  const avgAqi = zones.length ? Math.round(zones.reduce((s, z) => s + z.avgAqi, 0) / zones.length) : 0;
  const worstZone = zones.sort((a, b) => b.avgAqi - a.avgAqi)[0];

  return (
    <div>
      <PageHeader title="Pollution Analytics" subtitle="Air quality monitoring and hotspot analysis across city zones" />

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-5 animate-slide-up stagger-1">
          <Wind size={18} className="text-cyan-400 mb-2" />
          <p className="text-xs text-gray-500">City Average AQI</p>
          <p className="text-3xl font-black text-white mt-1">{avgAqi}</p>
          <p className="text-xs text-gray-600 mt-1">{avgAqi < 50 ? 'Good' : avgAqi < 100 ? 'Moderate' : avgAqi < 150 ? 'Unhealthy for Sensitive' : 'Unhealthy'}</p>
        </div>
        <div className="glass-card p-5 animate-slide-up stagger-2">
          <AlertTriangle size={18} className="text-amber-400 mb-2" />
          <p className="text-xs text-gray-500">Worst Zone</p>
          <p className="text-2xl font-bold text-white mt-1">{worstZone?.zone || '—'}</p>
          <p className="text-xs text-gray-600 mt-1">AQI: {worstZone?.avgAqi || '—'}</p>
        </div>
        <div className="glass-card p-5 animate-slide-up stagger-3">
          <TrendingUp size={18} className="text-primary-400 mb-2" />
          <p className="text-xs text-gray-500">Zones Monitored</p>
          <p className="text-3xl font-black text-white mt-1">{zones.length}</p>
          <p className="text-xs text-gray-600 mt-1">Active monitoring</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4 mb-8">
        <div className="glass-card p-5 animate-slide-up stagger-3">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <CloudRain size={16} className="text-cyan-400" /> AQI Trend (30 Days)
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d24" />
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: '#162119', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, color: '#e2e8f0' }} />
              <Area type="monotone" dataKey="aqi" stroke="#22d3ee" strokeWidth={2} fill="url(#aqiGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5 animate-slide-up stagger-4">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Wind size={16} className="text-amber-400" /> PM2.5 vs PM10
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={trend.filter((_, i) => i % 3 === 0)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d24" />
              <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: '#162119', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, color: '#e2e8f0' }} />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }} />
              <Bar dataKey="pm25" name="PM2.5" fill="#f59e0b" radius={[3, 3, 0, 0]} />
              <Bar dataKey="pm10" name="PM10" fill="#ef4444" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Zone Table */}
      <div className="glass-card p-5 animate-slide-up stagger-5">
        <h3 className="text-sm font-semibold text-white mb-4">Zone-Level Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary-800/15">
                <th className="text-left py-3 px-3 text-gray-500 font-medium">Zone</th>
                <th className="text-right py-3 px-3 text-gray-500 font-medium">Avg AQI</th>
                <th className="text-right py-3 px-3 text-gray-500 font-medium">PM2.5</th>
                <th className="text-right py-3 px-3 text-gray-500 font-medium">PM10</th>
                <th className="text-right py-3 px-3 text-gray-500 font-medium">CO₂ (ppm)</th>
                <th className="text-right py-3 px-3 text-gray-500 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {zones.map(zone => (
                <tr key={zone.zone} className="border-b border-primary-800/8 hover:bg-surface-300/20 transition-colors">
                  <td className="py-3 px-3 font-medium text-white">{zone.zone}</td>
                  <td className="py-3 px-3 text-right text-gray-300">{zone.avgAqi}</td>
                  <td className="py-3 px-3 text-right text-gray-300">{zone.avgPm25}</td>
                  <td className="py-3 px-3 text-right text-gray-300">{zone.avgPm10}</td>
                  <td className="py-3 px-3 text-right text-gray-300">{zone.avgCo2}</td>
                  <td className="py-3 px-3 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${riskColors[zone.riskLevel]}`}>
                      {zone.riskLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
