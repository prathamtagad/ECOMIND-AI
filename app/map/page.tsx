'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import PageHeader from '@/components/layout/page-header';
import { Tree } from '@/lib/types';
import { Filter } from 'lucide-react';

const TreeMapView = dynamic(() => import('@/components/map/tree-map'), { ssr: false });

const healthOptions = ['all', 'healthy', 'stressed', 'diseased', 'critical'];
const speciesOptions = ['all', 'Neem', 'Banyan', 'Shisham', 'Mango', 'Karanj', 'Amaltas', 'Peepal', 'Arjuna'];

export default function MapPage() {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [healthFilter, setHealthFilter] = useState('all');
  const [speciesFilter, setSpeciesFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (healthFilter !== 'all') params.set('health', healthFilter);
    if (speciesFilter !== 'all') params.set('species', speciesFilter);
    fetch(`/api/trees?${params}`).then(r => r.json()).then(d => setTrees(d.trees));
  }, [healthFilter, speciesFilter]);

  return (
    <div>
      <PageHeader title="Tree Map" subtitle="Interactive spatial view of urban tree cover">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-300/50 border border-primary-800/20 text-sm text-gray-300 hover:border-primary-600/30 transition-all"
        >
          <Filter size={16} />
          Filters
        </button>
      </PageHeader>

      {/* Filter panel */}
      {showFilters && (
        <div className="glass-card p-4 mb-4 flex flex-wrap gap-4 animate-slide-up">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Health Status</label>
            <select
              value={healthFilter}
              onChange={e => setHealthFilter(e.target.value)}
              className="bg-surface-300 border border-primary-800/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-primary-500"
            >
              {healthOptions.map(h => <option key={h} value={h}>{h === 'all' ? 'All Status' : h.charAt(0).toUpperCase() + h.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Species</label>
            <select
              value={speciesFilter}
              onChange={e => setSpeciesFilter(e.target.value)}
              className="bg-surface-300 border border-primary-800/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-primary-500"
            >
              {speciesOptions.map(s => <option key={s} value={s}>{s === 'all' ? 'All Species' : s}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <span className="text-xs text-gray-400 bg-surface-300/50 px-3 py-1.5 rounded-lg">{trees.length} trees shown</span>
          </div>
        </div>
      )}

      {/* Map */}
      <div className="glass-card overflow-hidden" style={{ height: 'calc(100vh - 240px)', minHeight: '400px' }}>
        <TreeMapView trees={trees} />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 px-2">
        {[
          { color: '#10b981', label: 'Healthy' },
          { color: '#f59e0b', label: 'Stressed' },
          { color: '#ef4444', label: 'Diseased' },
          { color: '#dc2626', label: 'Critical' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-3 h-3 rounded-full" style={{ background: item.color }} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
