import { SpeciesInfo } from '@/lib/types';

export const speciesDatabase: SpeciesInfo[] = [
  {
    species: 'Azadirachta indica', commonName: 'Neem', family: 'Meliaceae',
    maxHeight: 20, growthRate: 'fast', carbonAbsorption: 48, oxygenProduction: 35,
    waterRequirement: 'low', sunRequirement: 'full', nativeRegion: 'Indian Subcontinent',
    benefits: ['Air purification', 'Medicinal', 'Pest control', 'Shade provider'],
    imageUrl: '/images/neem.jpg',
  },
  {
    species: 'Ficus benghalensis', commonName: 'Banyan', family: 'Moraceae',
    maxHeight: 25, growthRate: 'medium', carbonAbsorption: 60, oxygenProduction: 45,
    waterRequirement: 'medium', sunRequirement: 'full', nativeRegion: 'Indian Subcontinent',
    benefits: ['Massive canopy', 'Habitat for birds', 'Carbon sink', 'Cultural significance'],
    imageUrl: '/images/banyan.jpg',
  },
  {
    species: 'Dalbergia sissoo', commonName: 'Shisham', family: 'Fabaceae',
    maxHeight: 18, growthRate: 'fast', carbonAbsorption: 35, oxygenProduction: 28,
    waterRequirement: 'low', sunRequirement: 'full', nativeRegion: 'South Asia',
    benefits: ['Timber value', 'Nitrogen fixing', 'Drought resistant', 'Erosion control'],
    imageUrl: '/images/shisham.jpg',
  },
  {
    species: 'Mangifera indica', commonName: 'Mango', family: 'Anacardiaceae',
    maxHeight: 15, growthRate: 'medium', carbonAbsorption: 40, oxygenProduction: 32,
    waterRequirement: 'medium', sunRequirement: 'full', nativeRegion: 'South Asia',
    benefits: ['Fruit bearing', 'Dense shade', 'Wildlife habitat', 'Air purification'],
    imageUrl: '/images/mango.jpg',
  },
  {
    species: 'Pongamia pinnata', commonName: 'Karanj', family: 'Fabaceae',
    maxHeight: 15, growthRate: 'medium', carbonAbsorption: 32, oxygenProduction: 25,
    waterRequirement: 'low', sunRequirement: 'full', nativeRegion: 'South Asia',
    benefits: ['Biofuel potential', 'Nitrogen fixing', 'Soil improvement', 'Medicinal'],
    imageUrl: '/images/karanj.jpg',
  },
  {
    species: 'Cassia fistula', commonName: 'Amaltas', family: 'Fabaceae',
    maxHeight: 12, growthRate: 'medium', carbonAbsorption: 28, oxygenProduction: 22,
    waterRequirement: 'low', sunRequirement: 'full', nativeRegion: 'South Asia',
    benefits: ['Ornamental flowers', 'Medicinal', 'Attracts pollinators', 'Low maintenance'],
    imageUrl: '/images/amaltas.jpg',
  },
  {
    species: 'Ficus religiosa', commonName: 'Peepal', family: 'Moraceae',
    maxHeight: 22, growthRate: 'fast', carbonAbsorption: 55, oxygenProduction: 42,
    waterRequirement: 'medium', sunRequirement: 'full', nativeRegion: 'Indian Subcontinent',
    benefits: ['24hr oxygen production', 'Sacred tree', 'Massive canopy', 'Carbon champion'],
    imageUrl: '/images/peepal.jpg',
  },
  {
    species: 'Terminalia arjuna', commonName: 'Arjuna', family: 'Combretaceae',
    maxHeight: 20, growthRate: 'medium', carbonAbsorption: 42, oxygenProduction: 33,
    waterRequirement: 'medium', sunRequirement: 'full', nativeRegion: 'Indian Subcontinent',
    benefits: ['Medicinal bark', 'Riverbank stabilizer', 'Air purification', 'Shade'],
    imageUrl: '/images/arjuna.jpg',
  },
];
