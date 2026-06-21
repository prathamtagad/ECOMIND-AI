'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/layout/page-header';
import { ShieldCheck, TreePine, AlertTriangle, CheckCircle, Clock, Eye } from 'lucide-react';
import { Tree, AdminAlert } from '@/lib/types';

export default function AdminPage() {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [alerts, setAlerts] = useState<AdminAlert[]>([]);

  useEffect(() => {
    fetch('/api/trees').then(r => r.json()).then(d => setTrees(d.trees));
    fetch('/api/admin/alerts').then(r => r.json()).then(setAlerts);
  }, []);

  const unhealthy = trees.filter(t => t.healthStatus !== 'healthy').length;

  const sevColors: Record<string, string> = {
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20',
    critical: 'bg-red-600/10 text-red-500 border-red-600/20',
  };

  const healthBadge: Record<string, string> = {
    healthy: 'bg-emerald-500/15 text-emerald-400',
    stressed: 'bg-amber-500/15 text-amber-400',
    diseased: 'bg-red-500/15 text-red-400',
    critical: 'bg-red-600/15 text-red-500',
  };

  return (
    <div>
      <PageHeader title="Admin Panel" subtitle="Manage tree data, monitor alerts, and oversee operations" />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: TreePine, label: 'Total Trees', value: trees.length, color: 'text-primary-400' },
          { icon: AlertTriangle, label: 'Unhealthy', value: unhealthy, color: 'text-amber-400' },
          { icon: Clock, label: 'Active Alerts', value: alerts.filter(a => !a.resolved).length, color: 'text-red-400' },
          { icon: CheckCircle, label: 'Resolved', value: alerts.filter(a => a.resolved).length, color: 'text-emerald-400' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="glass-card p-4 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <Icon size={16} className={`${s.color} mb-2`} />
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className="text-2xl font-bold text-white">{s.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Tree Table */}
        <div className="glass-card p-5 lg:col-span-3 animate-slide-up stagger-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TreePine size={16} className="text-primary-400" />
              <h3 className="text-sm font-semibold text-white">Tree Registry</h3>
            </div>
            <span className="text-xs text-gray-500">{trees.length} records</span>
          </div>
          <div className="overflow-x-auto max-h-[480px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-surface-200">
                <tr className="border-b border-primary-800/15">
                  <th className="text-left py-2 px-2 text-gray-500 text-xs font-medium">ID</th>
                  <th className="text-left py-2 px-2 text-gray-500 text-xs font-medium">Species</th>
                  <th className="text-left py-2 px-2 text-gray-500 text-xs font-medium">Zone</th>
                  <th className="text-center py-2 px-2 text-gray-500 text-xs font-medium">Health</th>
                  <th className="text-right py-2 px-2 text-gray-500 text-xs font-medium">Score</th>
                  <th className="text-center py-2 px-2 text-gray-500 text-xs font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {trees.slice(0, 30).map(tree => (
                  <tr key={tree.id} className="border-b border-primary-800/5 hover:bg-surface-300/20 transition-colors">
                    <td className="py-2 px-2 text-xs text-gray-400 font-mono">{tree.id}</td>
                    <td className="py-2 px-2 text-white text-xs">{tree.commonName}</td>
                    <td className="py-2 px-2 text-gray-400 text-xs">{tree.zone}</td>
                    <td className="py-2 px-2 text-center">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${healthBadge[tree.healthStatus]}`}>
                        {tree.healthStatus}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-right text-white text-xs font-medium">{tree.healthScore}</td>
                    <td className="py-2 px-2 text-center">
                      <Link href={`/trees/${tree.id}`} className="inline-flex items-center gap-1 text-primary-400 hover:text-primary-300 text-xs">
                        <Eye size={12} /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="glass-card p-5 lg:col-span-2 animate-slide-up stagger-4">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={16} className="text-amber-400" />
            <h3 className="text-sm font-semibold text-white">System Alerts</h3>
          </div>
          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            {alerts.map(alert => (
              <div key={alert.id} className={`p-3.5 rounded-xl border ${sevColors[alert.severity]} transition-all`}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-medium text-white">{alert.title}</p>
                  {alert.resolved && <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />}
                </div>
                <p className="text-xs text-gray-400 mb-2">{alert.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">{alert.zone} · {new Date(alert.timestamp).toLocaleDateString()}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${sevColors[alert.severity]}`}>
                    {alert.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
