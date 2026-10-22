export type ReleaseStatus = 'Confirmed' | 'Estimated' | 'Delayed' | 'TBA' | 'Released';

export type GameCategory = 
  | 'Open World'
  | 'Action and Adventure'
  | 'RPG'
  | 'FPS and Tactical Shooter'
  | 'Survival and Horror'
  | 'Soulslike'
  | 'Racing and Simulation'
  | 'Strategy'
  | 'Sci-Fi'
  | 'Fantasy';

export interface SystemRequirements {
  os: string;
  cpu: string;
  gpu: string;
  ram: string;
  vram: string;
  storage: string;
  directx?: string;
  notes?: string;
}

export interface GameCharacter {
  id: string;
  name: string;
  role: string;
  description: string;
  faction?: string;
}

export interface GameUpdate {
  date: string;
  title: string;
  summary: string;
  source: string;
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  coverImage: string;
  heroBanner: string;
  releaseDate: string; // e.g. "Fall 2025", "Q2 2026", "2026", "TBA"
  releaseDateSortable: string; // ISO date or "9999-12-31" for sorting
  releaseStatus: ReleaseStatus;
  developer: string;
  publisher: string;
  platforms: string[]; // e.g. ["PC (Steam)", "PC (Epic)", "PC (GOG)"]
  genres: GameCategory[];
  engine: string; // e.g. "Unreal Engine 5.4", "RAGE 9", "Decima"
  trailerYoutubeId: string; // YouTube video ID for official trailer embed
  overview: string;
  
  // Story and Lore
  storyConfirmed: string;
  storySpeculation?: string;
  isReleased: boolean;
  hasSpoilers?: boolean;
  spoilerContent?: string;
  worldBuilding: string;
  characters: GameCharacter[];
  
  // Mechanics & Graphics
  gameplayMechanics: string[];
  missionsAndExploration: string;
  visualFeatures: string[]; // e.g. "Full Path Tracing", "NVIDIA DLSS 3.7", "Lumen GI", "Nanite Geometry"
  combatSystem?: string;
  weaponsAndVehicles?: string[];
  
  // Hardware Requirements
  minRequirements: SystemRequirements;
  recommendedRequirements: SystemRequirements;
  
  // Media & Metadata
  screenshots: string[];
  recentUpdates: GameUpdate[];
  sources: { title: string; url: string }[];
  lastVerifiedDate: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  rankingScore?: number; // 1-100 for trending rank
  rating?: number; // e.g. 9.5 for released reviews
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  teaser: string;
  content: string; // Markdown or formatted text
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  category: 'Breaking News' | 'Hardware & Tech' | 'Developer Interview' | 'Game Preview' | 'Patch Notes' | 'Analysis';
  readTime: string;
  coverImage: string;
  relatedGameSlug?: string;
  relatedGameTitle?: string;
  tags: string[];
  keyTakeaways: string[];
  sourceUrl?: string;
  isFeatured?: boolean;
}

export interface FilterState {
  searchQuery: string;
  status: string; // 'all' | ReleaseStatus
  genre: string; // 'all' | GameCategory
  developer: string;
  releaseYear: string;
  hardwareTier: string;
  sortBy: 'featured' | 'newest' | 'releaseDate' | 'trending';
}
