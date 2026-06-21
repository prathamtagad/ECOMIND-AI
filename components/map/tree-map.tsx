'use client';

import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import Link from 'next/link';
import { Tree } from '@/lib/types';
import 'leaflet/dist/leaflet.css';

const healthColors: Record<string, string> = {
  healthy: '#10b981',
  stressed: '#f59e0b',
  diseased: '#ef4444',
  critical: '#dc2626',
};

interface TreeMapProps {
  trees: Tree[];
}

export default function TreeMapView({ trees }: TreeMapProps) {
  const center: [number, number] = [22.7196, 75.8577]; // Indore

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {trees.map(tree => (
        <CircleMarker
          key={tree.id}
          center={[tree.lat, tree.lng]}
          radius={7}
          fillColor={healthColors[tree.healthStatus]}
          fillOpacity={0.8}
          stroke={true}
          color={healthColors[tree.healthStatus]}
          weight={2}
          opacity={0.4}
        >
          <Popup>
            <div className="min-w-[200px]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm">{tree.commonName}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{
                  background: `${healthColors[tree.healthStatus]}22`,
                  color: healthColors[tree.healthStatus],
                }}>
                  {tree.healthStatus}
                </span>
              </div>
              <p className="text-xs text-gray-400 italic mb-2">{tree.species}</p>
              <div className="grid grid-cols-2 gap-1 text-xs mb-3">
                <span className="text-gray-400">ID:</span><span>{tree.id}</span>
                <span className="text-gray-400">Zone:</span><span>{tree.zone}</span>
                <span className="text-gray-400">Health:</span><span>{tree.healthScore}/100</span>
                <span className="text-gray-400">CO₂:</span><span>{tree.carbonAbsorption} kg/yr</span>
              </div>
              <Link href={`/trees/${tree.id}`} className="block text-center text-xs bg-emerald-600 hover:bg-emerald-500 text-white py-1.5 rounded-lg transition-colors">
                View Full Profile →
              </Link>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
