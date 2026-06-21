import { AIAnalysisResult } from '@/lib/types';

const findingsMap: Record<AIAnalysisResult['classification'], string[][]> = {
  healthy: [
    ['Vibrant green foliage with uniform coloration', 'No signs of pest damage or disease', 'Strong branch structure with balanced canopy'],
    ['Healthy leaf density and appropriate growth pattern', 'Root collar visible and trunk appears sound', 'No wilting or discoloration detected'],
  ],
  stressed: [
    ['Mild leaf curling observed at branch tips', 'Slight yellowing on lower canopy leaves', 'Early signs of water stress detected'],
    ['Partial defoliation on south-facing branches', 'Minor chlorosis patterns visible', 'Reduced new growth compared to species baseline'],
  ],
  diseased: [
    ['Significant leaf spot patterns consistent with fungal infection', 'Brown necrotic patches on 30-40% of foliage', 'Canker formation detected on main branches'],
    ['Powdery mildew presence on leaf surfaces', 'Bark splitting with possible bacterial entry', 'Unusual growths suggesting gall formation'],
  ],
  critical: [
    ['Severe crown dieback exceeding 60%', 'Extensive bark damage with exposed heartwood', 'Major structural failure risk — leaning trunk'],
    ['Root rot indicators at base — fungal fruiting bodies present', 'Near-complete defoliation with no new growth', 'Multiple pest infestations weakening structure'],
  ],
};

const recommendationMap: Record<AIAnalysisResult['classification'], string[]> = {
  healthy: [
    'Continue regular maintenance schedule. Apply seasonal fertilizer and maintain mulch ring.',
    'Tree is thriving. Schedule next routine inspection in 6 months.',
  ],
  stressed: [
    'Increase watering to 3x/week. Apply 3-inch mulch layer. Monitor for 2 weeks and re-assess.',
    'Consider soil amendment and deep root watering. Reduce nearby construction activity if applicable.',
  ],
  diseased: [
    'Apply copper-based fungicide immediately. Prune and destroy affected branches. Schedule arborist visit within 7 days.',
    'Isolate from nearby trees if possible. Begin treatment protocol and monitor weekly.',
  ],
  critical: [
    'URGENT: Schedule professional arborist assessment within 48 hours. Cordon off area for public safety.',
    'CRITICAL: Tree poses structural risk. Immediate evaluation for removal or emergency stabilization required.',
  ],
};

export function analyzeTreeImage(_imageData?: string): AIAnalysisResult {
  // Rule-based simulation that produces realistic AI-like results
  const rand = Math.random();
  let classification: AIAnalysisResult['classification'];
  if (rand < 0.40) classification = 'healthy';
  else if (rand < 0.70) classification = 'stressed';
  else if (rand < 0.90) classification = 'diseased';
  else classification = 'critical';

  const confidenceRanges = { healthy: [82, 96], stressed: [74, 89], diseased: [71, 86], critical: [68, 84] };
  const [min, max] = confidenceRanges[classification];
  const confidence = Math.round(min + Math.random() * (max - min));

  const findingOptions = findingsMap[classification];
  const findings = findingOptions[Math.floor(Math.random() * findingOptions.length)];

  const recOptions = recommendationMap[classification];
  const recommendation = recOptions[Math.floor(Math.random() * recOptions.length)];

  return {
    id: `AI-${Date.now()}`,
    classification,
    confidence,
    findings,
    recommendation,
    analyzedAt: new Date().toISOString(),
    processingTime: 1800 + Math.round(Math.random() * 1200),
  };
}
