export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

export interface NFT {
  id: string;
  name: string;
  rarity: Rarity;
  description: string;
  attributes: {
    attack: number;
    defense: number;
    speed: number;
    intelligence: number;
  };
  imageUrl: string;
  modelColor: string;
  edition: number;
  totalSupply: number;
}

export const rarityColors: Record<Rarity, string> = {
  Common: '#8B8B8B',
  Uncommon: '#00FF00',
  Rare: '#0080FF',
  Epic: '#9D00FF',
  Legendary: '#FFD700',
  Mythic: '#FF0080',
};

export const rarityGlow: Record<Rarity, string> = {
  Common: 'rgba(139, 139, 139, 0.5)',
  Uncommon: 'rgba(0, 255, 0, 0.5)',
  Rare: 'rgba(0, 128, 255, 0.5)',
  Epic: 'rgba(157, 0, 255, 0.5)',
  Legendary: 'rgba(255, 215, 0, 0.5)',
  Mythic: 'rgba(255, 0, 128, 0.5)',
};

export const nftCollection: NFT[] = [
  {
    id: 'demo-001',
    name: 'Shadow Stalker',
    rarity: 'Legendary',
    description: 'The first Demogorgon to emerge from the Upside Down. Apex predator with unmatched hunting abilities.',
    attributes: {
      attack: 95,
      defense: 80,
      speed: 85,
      intelligence: 45,
    },
    imageUrl: '/assets/demo1.png',
    modelColor: '#1a0a0a',
    edition: 1,
    totalSupply: 10,
  },
  {
    id: 'demo-002',
    name: 'Crimson Maw',
    rarity: 'Epic',
    description: 'Blood-soaked terror from the depths. Known for its ferocious attacks.',
    attributes: {
      attack: 90,
      defense: 70,
      speed: 75,
      intelligence: 40,
    },
    imageUrl: '/assets/demo2.png',
    modelColor: '#8B0000',
    edition: 2,
    totalSupply: 25,
  },
  {
    id: 'demo-003',
    name: 'Void Walker',
    rarity: 'Mythic',
    description: 'Transcendent being that exists between dimensions. Rarest of all Demogorgons.',
    attributes: {
      attack: 100,
      defense: 95,
      speed: 90,
      intelligence: 85,
    },
    imageUrl: '/assets/demo3.png',
    modelColor: '#4B0082',
    edition: 3,
    totalSupply: 5,
  },
  {
    id: 'demo-004',
    name: 'Forest Lurker',
    rarity: 'Rare',
    description: 'Camouflaged hunter that stalks through the twisted woods of the Upside Down.',
    attributes: {
      attack: 75,
      defense: 65,
      speed: 80,
      intelligence: 50,
    },
    imageUrl: '/assets/demo4.png',
    modelColor: '#2F4F2F',
    edition: 4,
    totalSupply: 50,
  },
  {
    id: 'demo-005',
    name: 'Juvenile Snapper',
    rarity: 'Common',
    description: 'Young Demogorgon still developing its powers. Common but deadly.',
    attributes: {
      attack: 50,
      defense: 45,
      speed: 60,
      intelligence: 30,
    },
    imageUrl: '/assets/demo5.png',
    modelColor: '#4A4A4A',
    edition: 5,
    totalSupply: 200,
  },
  {
    id: 'demo-006',
    name: 'Electric Fiend',
    rarity: 'Epic',
    description: 'Charged with energy from the Upside Down. Crackling with raw power.',
    attributes: {
      attack: 85,
      defense: 75,
      speed: 88,
      intelligence: 55,
    },
    imageUrl: '/assets/demo6.png',
    modelColor: '#00FFFF',
    edition: 6,
    totalSupply: 30,
  },
  {
    id: 'demo-007',
    name: 'Pack Hunter',
    rarity: 'Uncommon',
    description: 'Works in coordination with other Demogorgons. Strength in numbers.',
    attributes: {
      attack: 60,
      defense: 55,
      speed: 70,
      intelligence: 60,
    },
    imageUrl: '/assets/demo7.png',
    modelColor: '#8B4513',
    edition: 7,
    totalSupply: 100,
  },
  {
    id: 'demo-008',
    name: 'Toxic Spitter',
    rarity: 'Rare',
    description: 'Mutated variant capable of projecting acidic bile. Extremely dangerous.',
    attributes: {
      attack: 80,
      defense: 60,
      speed: 65,
      intelligence: 48,
    },
    imageUrl: '/assets/demo8.png',
    modelColor: '#9ACD32',
    edition: 8,
    totalSupply: 40,
  },
  {
    id: 'demo-009',
    name: 'Alpha Prime',
    rarity: 'Legendary',
    description: 'Leader of the pack. Commands lesser Demogorgons with terrifying efficiency.',
    attributes: {
      attack: 92,
      defense: 88,
      speed: 80,
      intelligence: 75,
    },
    imageUrl: '/assets/demo9.png',
    modelColor: '#DAA520',
    edition: 9,
    totalSupply: 15,
  },
  {
    id: 'demo-010',
    name: 'Frost Biter',
    rarity: 'Epic',
    description: 'Adapted to the coldest regions of the Upside Down. Freezing touch.',
    attributes: {
      attack: 82,
      defense: 78,
      speed: 70,
      intelligence: 52,
    },
    imageUrl: '/assets/demo10.png',
    modelColor: '#B0E0E6',
    edition: 10,
    totalSupply: 35,
  },
  {
    id: 'demodog-001',
    name: 'Dart',
    rarity: 'Rare',
    description: 'The famous Demo-Dog raised by Dustin. Loyal but dangerous.',
    attributes: {
      attack: 70,
      defense: 60,
      speed: 85,
      intelligence: 65,
    },
    imageUrl: '/assets/demodog1.png',
    modelColor: '#8B0000',
    edition: 11,
    totalSupply: 50,
  },
  {
    id: 'demodog-002',
    name: 'Scout Runner',
    rarity: 'Uncommon',
    description: 'Fast-moving Demo-Dog used for reconnaissance by the Mind Flayer.',
    attributes: {
      attack: 55,
      defense: 50,
      speed: 90,
      intelligence: 58,
    },
    imageUrl: '/assets/demodog2.png',
    modelColor: '#696969',
    edition: 12,
    totalSupply: 80,
  },
  {
    id: 'demodog-003',
    name: 'Pack Alpha',
    rarity: 'Epic',
    description: 'Leader of a Demo-Dog pack. Coordinated and cunning.',
    attributes: {
      attack: 78,
      defense: 68,
      speed: 82,
      intelligence: 70,
    },
    imageUrl: '/assets/demodog3.png',
    modelColor: '#4B0000',
    edition: 13,
    totalSupply: 25,
  },
  {
    id: 'demo-011',
    name: 'Midnight Prowler',
    rarity: 'Common',
    description: 'Standard Demogorgon variant. Still terrifying in its own right.',
    attributes: {
      attack: 52,
      defense: 48,
      speed: 58,
      intelligence: 35,
    },
    imageUrl: '/assets/demo11.png',
    modelColor: '#1C1C1C',
    edition: 14,
    totalSupply: 150,
  },
  {
    id: 'demo-012',
    name: 'Tentacle Horror',
    rarity: 'Legendary',
    description: 'Mutated with extra appendages. Nightmare incarnate.',
    attributes: {
      attack: 94,
      defense: 85,
      speed: 75,
      intelligence: 50,
    },
    imageUrl: '/assets/demo12.png',
    modelColor: '#800020',
    edition: 15,
    totalSupply: 12,
  },
];

export const getRarityMultiplier = (rarity: Rarity): number => {
  const multipliers: Record<Rarity, number> = {
    Common: 1,
    Uncommon: 1.5,
    Rare: 2,
    Epic: 3,
    Legendary: 5,
    Mythic: 10,
  };
  return multipliers[rarity];
};
