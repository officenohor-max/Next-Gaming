import { Game, NewsArticle } from '../types';
import { INITIAL_GAMES, INITIAL_NEWS } from '../data/initialData';

const GAMES_STORAGE_KEY = 'nextlevel_gaming_games_v2';
const NEWS_STORAGE_KEY = 'nextlevel_gaming_news_v2';
const ADMIN_AUTH_KEY = 'nextlevel_gaming_admin_session';

const sanitizeGame = (g: any): Game => {
  return {
    id: g?.id || `game-${Date.now()}`,
    slug: g?.slug || 'unknown-game',
    title: g?.title || 'Untitled Game',
    tagline: g?.tagline || '',
    coverImage: g?.coverImage || '/src/assets/images/hero_vice_overdrive_1792661617541.jpg',
    heroBanner: g?.heroBanner || g?.coverImage || '/src/assets/images/hero_vice_overdrive_1792661617541.jpg',
    releaseDate: g?.releaseDate || 'TBA',
    releaseDateSortable: g?.releaseDateSortable || '9999-12-31',
    releaseStatus: g?.releaseStatus || 'TBA',
    developer: g?.developer || 'Unknown Studio',
    publisher: g?.publisher || 'Unknown Publisher',
    platforms: Array.isArray(g?.platforms) ? g.platforms : ['PC'],
    genres: Array.isArray(g?.genres) && g.genres.length > 0 ? g.genres : ['Action and Adventure'],
    engine: g?.engine || 'Proprietary',
    trailerYoutubeId: g?.trailerYoutubeId || '',
    overview: g?.overview || 'No overview available.',
    storyConfirmed: g?.storyConfirmed || 'Story information pending verification.',
    storySpeculation: g?.storySpeculation || '',
    isReleased: Boolean(g?.isReleased),
    hasSpoilers: Boolean(g?.hasSpoilers),
    spoilerContent: g?.spoilerContent || '',
    worldBuilding: g?.worldBuilding || '',
    characters: Array.isArray(g?.characters) ? g.characters : [],
    gameplayMechanics: Array.isArray(g?.gameplayMechanics) ? g.gameplayMechanics : [],
    missionsAndExploration: g?.missionsAndExploration || '',
    visualFeatures: Array.isArray(g?.visualFeatures) ? g.visualFeatures : [],
    combatSystem: g?.combatSystem || '',
    weaponsAndVehicles: Array.isArray(g?.weaponsAndVehicles) ? g.weaponsAndVehicles : [],
    minRequirements: g?.minRequirements || {
      os: 'Windows 10/11 64-bit',
      cpu: 'Quad-Core Processor',
      gpu: 'GTX 1060 / RX 580',
      ram: '16 GB',
      vram: '6 GB',
      storage: '100 GB SSD space'
    },
    recommendedRequirements: g?.recommendedRequirements || {
      os: 'Windows 11 64-bit',
      cpu: 'Modern 8-Core Processor',
      gpu: 'RTX 3070 / RX 6700 XT',
      ram: '32 GB',
      vram: '8 GB',
      storage: '100 GB NVMe SSD space'
    },
    screenshots: Array.isArray(g?.screenshots) ? g.screenshots : [],
    recentUpdates: Array.isArray(g?.recentUpdates) ? g.recentUpdates : [],
    sources: Array.isArray(g?.sources) ? g.sources : [],
    lastVerifiedDate: g?.lastVerifiedDate || 'October 2026',
    isFeatured: Boolean(g?.isFeatured),
    isTrending: Boolean(g?.isTrending),
    rankingScore: typeof g?.rankingScore === 'number' ? g.rankingScore : 80,
    rating: g?.rating
  };
};

const sanitizeNews = (n: any): NewsArticle => {
  return {
    id: n?.id || `news-${Date.now()}`,
    slug: n?.slug || 'unknown-article',
    title: n?.title || 'Editorial Update',
    teaser: n?.teaser || '',
    content: n?.content || '',
    author: {
      name: n?.author?.name || 'Staff Editor',
      role: n?.author?.role || 'Gaming Journalist',
      avatar: n?.author?.avatar
    },
    publishedAt: n?.publishedAt || 'Recently',
    category: n?.category || 'Breaking News',
    readTime: n?.readTime || '4 min read',
    coverImage: n?.coverImage || '/src/assets/images/hero_cyber_orion_1792661614409.jpg',
    relatedGameSlug: n?.relatedGameSlug,
    relatedGameTitle: n?.relatedGameTitle,
    tags: Array.isArray(n?.tags) ? n.tags : ['Gaming', 'PC'],
    keyTakeaways: Array.isArray(n?.keyTakeaways) ? n.keyTakeaways : [],
    sourceUrl: n?.sourceUrl,
    isFeatured: Boolean(n?.isFeatured)
  };
};

class StorageService {
  private games: Game[] = [];
  private news: NewsArticle[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    this.init();
  }

  private isStorageAvailable(): boolean {
    try {
      if (typeof window === 'undefined') return false;
      const test = '__storage_test__';
      window.localStorage.setItem(test, test);
      window.localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  private init() {
    try {
      if (this.isStorageAvailable()) {
        const storedGames = window.localStorage.getItem(GAMES_STORAGE_KEY);
        if (storedGames) {
          const parsed = JSON.parse(storedGames);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.games = parsed.map(sanitizeGame);
          } else {
            this.games = INITIAL_GAMES.map(sanitizeGame);
            this.saveGamesToStorage();
          }
        } else {
          this.games = INITIAL_GAMES.map(sanitizeGame);
          this.saveGamesToStorage();
        }

        const storedNews = window.localStorage.getItem(NEWS_STORAGE_KEY);
        if (storedNews) {
          const parsedNews = JSON.parse(storedNews);
          if (Array.isArray(parsedNews) && parsedNews.length > 0) {
            this.news = parsedNews.map(sanitizeNews);
          } else {
            this.news = INITIAL_NEWS.map(sanitizeNews);
            this.saveNewsToStorage();
          }
        } else {
          this.news = INITIAL_NEWS.map(sanitizeNews);
          this.saveNewsToStorage();
        }
      } else {
        this.games = INITIAL_GAMES.map(sanitizeGame);
        this.news = INITIAL_NEWS.map(sanitizeNews);
      }
    } catch (e) {
      console.warn('Storage init fallback to initial verified seed', e);
      this.games = INITIAL_GAMES.map(sanitizeGame);
      this.news = INITIAL_NEWS.map(sanitizeNews);
    }
  }

  private saveGamesToStorage() {
    try {
      if (this.isStorageAvailable()) {
        window.localStorage.setItem(GAMES_STORAGE_KEY, JSON.stringify(this.games));
      }
      this.notify();
    } catch (e) {
      console.warn('Failed to persist games to localStorage', e);
    }
  }

  private saveNewsToStorage() {
    try {
      if (this.isStorageAvailable()) {
        window.localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(this.news));
      }
      this.notify();
    } catch (e) {
      console.warn('Failed to persist news to localStorage', e);
    }
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error(err);
      }
    });
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  // Games CRUD
  public getGames(): Game[] {
    return this.games.length > 0 ? [...this.games] : INITIAL_GAMES.map(sanitizeGame);
  }

  public getGameBySlug(slug: string): Game | undefined {
    if (!slug) return undefined;
    const cleanSlug = slug.toLowerCase().trim();
    return this.getGames().find((g) => g.slug.toLowerCase().trim() === cleanSlug);
  }

  public getGameById(id: string): Game | undefined {
    return this.getGames().find((g) => g.id === id);
  }

  public addGame(newGame: Omit<Game, 'id'>): Game {
    const game = sanitizeGame({
      ...newGame,
      id: `game-${Date.now()}`
    });
    this.games.unshift(game);
    this.saveGamesToStorage();
    return game;
  }

  public updateGame(id: string, updatedFields: Partial<Game>): Game | null {
    const index = this.games.findIndex((g) => g.id === id);
    if (index === -1) return null;
    this.games[index] = sanitizeGame({
      ...this.games[index],
      ...updatedFields
    });
    this.saveGamesToStorage();
    return this.games[index];
  }

  public deleteGame(id: string): boolean {
    const initialLen = this.games.length;
    this.games = this.games.filter((g) => g.id !== id);
    if (this.games.length !== initialLen) {
      this.saveGamesToStorage();
      return true;
    }
    return false;
  }

  // News CRUD
  public getNews(): NewsArticle[] {
    return this.news.length > 0 ? [...this.news] : INITIAL_NEWS.map(sanitizeNews);
  }

  public getNewsBySlug(slug: string): NewsArticle | undefined {
    if (!slug) return undefined;
    const cleanSlug = slug.toLowerCase().trim();
    return this.getNews().find((n) => n.slug.toLowerCase().trim() === cleanSlug);
  }

  public getNewsById(id: string): NewsArticle | undefined {
    return this.getNews().find((n) => n.id === id);
  }

  public addNews(newArticle: Omit<NewsArticle, 'id'>): NewsArticle {
    const article = sanitizeNews({
      ...newArticle,
      id: `news-${Date.now()}`
    });
    this.news.unshift(article);
    this.saveNewsToStorage();
    return article;
  }

  public updateNews(id: string, updatedFields: Partial<NewsArticle>): NewsArticle | null {
    const index = this.news.findIndex((n) => n.id === id);
    if (index === -1) return null;
    this.news[index] = sanitizeNews({
      ...this.news[index],
      ...updatedFields
    });
    this.saveNewsToStorage();
    return this.news[index];
  }

  public deleteNews(id: string): boolean {
    const initialLen = this.news.length;
    this.news = this.news.filter((n) => n.id !== id);
    if (this.news.length !== initialLen) {
      this.saveNewsToStorage();
      return true;
    }
    return false;
  }

  // Admin Auth simulation
  public isAdminAuthenticated(): boolean {
    try {
      if (this.isStorageAvailable()) {
        return window.localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
      }
      return false;
    } catch {
      return false;
    }
  }

  public setAdminAuthenticated(auth: boolean) {
    try {
      if (this.isStorageAvailable()) {
        if (auth) {
          window.localStorage.setItem(ADMIN_AUTH_KEY, 'true');
        } else {
          window.localStorage.removeItem(ADMIN_AUTH_KEY);
        }
      }
      this.notify();
    } catch (e) {
      console.warn(e);
    }
  }

  // Backup & Restore
  public exportData(): string {
    return JSON.stringify({
      version: '2.0',
      exportedAt: new Date().toISOString(),
      games: this.games,
      news: this.news
    }, null, 2);
  }

  public importData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed.games) && Array.isArray(parsed.news)) {
        this.games = parsed.games.map(sanitizeGame);
        this.news = parsed.news.map(sanitizeNews);
        this.saveGamesToStorage();
        this.saveNewsToStorage();
        return true;
      }
      return false;
    } catch (e) {
      console.error('Import parse error', e);
      return false;
    }
  }

  public resetToDefaults() {
    this.games = INITIAL_GAMES.map(sanitizeGame);
    this.news = INITIAL_NEWS.map(sanitizeNews);
    this.saveGamesToStorage();
    this.saveNewsToStorage();
  }
}

export const storageService = new StorageService();
