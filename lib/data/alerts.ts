import { AdminAlert } from '@/lib/types';

export const alerts: AdminAlert[] = [
  { id: 'ALT-001', type: 'critical', title: 'Critical Tree Health Alert', description: 'TREE-0008 in Bhawarkua shows severe crown dieback. Immediate arborist assessment required.', zone: 'Bhawarkua', severity: 'critical', timestamp: '2026-06-21T08:30:00Z', resolved: false, treeId: 'TREE-0008' },
  { id: 'ALT-002', type: 'pollution', title: 'AQI Spike — Rajwada', description: 'AQI exceeded 180 in Rajwada zone for 3 consecutive hours. Recommend advisory.', zone: 'Rajwada', severity: 'danger', timestamp: '2026-06-21T06:15:00Z', resolved: false },
  { id: 'ALT-003', type: 'health', title: 'Disease Cluster Detected', description: '4 trees in Vijay Nagar showing similar fungal infection patterns. Potential spread risk.', zone: 'Vijay Nagar', severity: 'warning', timestamp: '2026-06-20T14:00:00Z', resolved: false, treeId: 'TREE-0005' },
  { id: 'ALT-004', type: 'inspection', title: 'Overdue Inspections', description: '12 trees in MR-10 Corridor have not been inspected in over 90 days.', zone: 'MR-10 Corridor', severity: 'warning', timestamp: '2026-06-20T09:00:00Z', resolved: false },
  { id: 'ALT-005', type: 'pollution', title: 'CO₂ Levels Elevated', description: 'Average CO₂ in Palasia zone 15% above monthly baseline.', zone: 'Palasia', severity: 'info', timestamp: '2026-06-19T16:30:00Z', resolved: true },
  { id: 'ALT-006', type: 'health', title: 'Water Stress Warning', description: 'Multiple trees in AB Road zone showing signs of dehydration due to recent heat wave.', zone: 'AB Road', severity: 'warning', timestamp: '2026-06-19T11:00:00Z', resolved: false },
];
