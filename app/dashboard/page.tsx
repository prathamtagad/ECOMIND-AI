'use client';

import { useEffect, useState } from 'react';
import PageHeader from '@/components/layout/page-header';
import { TreePine, AlertTriangle, Wind, Leaf, Activity, Sprout, TrendingUp, TrendingDown } from 'lucide-react';
import { DashboardStats, AdminAlert } from '@/lib/types';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const carbonTrend = [
  { month: 'Jan', carbon: 82 }, { month: 'Feb', carbon: 88 }, { month: 'Mar', carbon: 95 },
  { month: 'Apr', carbon: 110 }, { month: 'May', carbon: 124 }, { month: 'Jun', carbon: 135 },
];

const HEALTH_COLORS = ['#10b981', '#f59e0b', '#ef4444', '#dc2626'];
const SPECIES_COLORS = ['#10b981', '#22d3ee', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4', '#84cc16', '#f97316'];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [alerts, setAlerts] = useState<AdminAlert[]>([]);

  useEffect(() => {
    fetch('/api/dashboard/stats').then(r => r.json()).then(setStats);
    fetch('/api/admin/alerts').then(r => r.json()).then(setAlerts);
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const healthData = [
    { name: 'Healthy', value: stats.healthyTrees },
    { name: 'Stressed', value: stats.stressedTrees },
    { name: 'Diseased', value: stats.diseasedTrees },
    { name: 'Critical', value: stats.criticalTrees },
  ];

  const speciesData = [
    { name: 'Neem', count: 8 }, { name: 'Banyan', count: 8 }, { name: 'Shisham', count: 8 },
    { name: 'Mango', count: 8 }, { name: 'Karanj', count: 8 }, { name: 'Amaltas', count: 8 },
    { name: 'Peepal', count: 8 }, { name: 'Arjuna', count: 8 },
  ];

  const metricCards = [
    { label: 'Total Trees', value: stats.totalTrees, icon: TreePine, color: 'text-primary-400', bgColor: 'bg-primary-600/10', trend: '+12%', trendUp: true },
    { label: 'Unhealthy Trees', value: stats.stressedTrees + stats.diseasedTrees + stats.criticalTrees, icon: AlertTriangle, color: 'text-amber-400', bgColor: 'bg-amber-600/10', trend: '-3%', trendUp: false },
    { label: 'Avg AQI', value: stats.averageAqi, icon: Wind, color: 'text-cyan-400', bgColor: 'bg-cyan-600/10', trend: '-8%', trendUp: false },
    { label: 'CO₂ Captured', value: `${stats.totalCarbonCaptured}T`, icon: Leaf, color: 'text-emerald-400', bgColor: 'bg-emerald-600/10', trend: '+18%', trendUp: true },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Real-time urban forest intelligence overview" />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metricCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="glass-card p-5 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${card.bgColor} flex items-center justify-center`}>
                  <Icon size={20} className={card.color} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${card.trendUp ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {card.trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {card.trend}
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{card.value}</p>
              <p className="text-xs text-gray-500 mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-4 mb-8">
        {/* Carbon Trend */}
        <div className="glass-card p-5 lg:col-span-2 animate-slide-up stagger-3">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={16} className="text-primary-400" />
            <h3 className="text-sm font-semibold text-white">Carbon Capture Trend</h3>
            <span className="text-xs text-gray-500 ml-auto">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={carbonTrend}>
              <defs>
                <linearGradient id="carbonGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d24" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: '#162119', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, color: '#e2e8f0' }} />
              <Area type="monotone" dataKey="carbon" stroke="#10b981" strokeWidth={2} fill="url(#carbonGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Health Distribution Pie */}
        <div className="glass-card p-5 animate-slide-up stagger-4">
          <div className="flex items-center gap-2 mb-4">
            <Sprout size={16} className="text-primary-400" />
            <h3 className="text-sm font-semibold text-white">Health Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={healthData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {healthData.map((_, i) => <Cell key={i} fill={HEALTH_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#162119', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, color: '#e2e8f0' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {healthData.map((d, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full" style={{ background: HEALTH_COLORS[i] }} />
                <span className="text-gray-400">{d.name}: {d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Species Chart */}
        <div className="glass-card p-5 animate-slide-up stagger-5">
          <div className="flex items-center gap-2 mb-4">
            <TreePine size={16} className="text-primary-400" />
            <h3 className="text-sm font-semibold text-white">Species Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={speciesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d24" />
              <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} angle={-30} textAnchor="end" height={50} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: '#162119', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, color: '#e2e8f0' }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {speciesData.map((_, i) => <Cell key={i} fill={SPECIES_COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts */}
        <div className="glass-card p-5 animate-slide-up stagger-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} className="text-amber-400" />
            <h3 className="text-sm font-semibold text-white">Recent Alerts</h3>
            <span className="ml-auto text-xs text-gray-500">{alerts.filter(a => !a.resolved).length} active</span>
          </div>
          <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1">
            {alerts.slice(0, 5).map(alert => (
              <div key={alert.id} className={`p-3 rounded-xl border ${
                alert.severity === 'critical' ? 'bg-red-500/5 border-red-500/20' :
                alert.severity === 'danger' ? 'bg-red-500/5 border-red-500/15' :
                alert.severity === 'warning' ? 'bg-amber-500/5 border-amber-500/15' :
                'bg-blue-500/5 border-blue-500/15'
              }`}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-white">{alert.title}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                    alert.severity === 'danger' ? 'bg-red-500/15 text-red-400' :
                    alert.severity === 'warning' ? 'bg-amber-500/15 text-amber-400' :
                    'bg-blue-500/15 text-blue-400'
                  }`}>{alert.severity}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{alert.zone} · {new Date(alert.timestamp).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
