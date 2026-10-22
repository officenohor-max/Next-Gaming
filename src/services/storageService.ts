import { Game, NewsArticle } from '../types';
import { INITIAL_GAMES, INITIAL_NEWS } from '../data/initialData';

const GAMES_STORAGE_KEY = 'nextlevel_gaming_games_v1';
const NEWS_STORAGE_KEY = 'nextlevel_gaming_news_v1';
const ADMIN_AUTH_KEY = 'nextlevel_gaming_admin_session';

class StorageService {
  private games: Game[] = [];
  private news: NewsArticle[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    this.init();
  }

  private init() {
    try {
      const storedGames = localStorage.getItem(GAMES_STORAGE_KEY);
      if (storedGames) {
        this.games = JSON.parse(storedGames);
      } else {
        this.games = [...INITIAL_GAMES];
        this.saveGamesToStorage();
      }

      const storedNews = localStorage.getItem(NEWS_STORAGE_KEY);
      if (storedNews) {
        this.news = JSON.parse(storedNews);
      } else {
        this.news = [...INITIAL_NEWS];
        this.saveNewsToStorage();
      }
    } catch (e) {
      console.warn('Storage initial load error, falling back to seed data', e);
      this.games = [...INITIAL_GAMES];
      this.news = [...INITIAL_NEWS];
    }
  }

  private saveGamesToStorage() {
    try {
      localStorage.setItem(GAMES_STORAGE_KEY, JSON.stringify(this.games));
      this.notify();
    } catch (e) {
      console.error('Failed to save games to localStorage', e);
    }
  }

  private saveNewsToStorage() {
    try {
      localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(this.news));
      this.notify();
    } catch (e) {
      console.error('Failed to save news to localStorage', e);
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  // Games CRUD
  public getGames(): Game[] {
    return [...this.games];
  }

  public getGameBySlug(slug: string): Game | undefined {
    return this.games.find((g) => g.slug.toLowerCase() === slug.toLowerCase());
  }

  public getGameById(id: string): Game | undefined {
    return this.games.find((g) => g.id === id);
  }

  public addGame(newGame: Omit<Game, 'id'>): Game {
    const game: Game = {
      ...newGame,
      id: `game-${Date.now()}`
    };
    this.games.unshift(game);
    this.saveGamesToStorage();
    return game;
  }

  public updateGame(id: string, updatedFields: Partial<Game>): Game | null {
    const index = this.games.findIndex((g) => g.id === id);
    if (index === -1) return null;
    this.games[index] = {
      ...this.games[index],
      ...updatedFields
    };
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
    return [...this.news];
  }

  public getNewsBySlug(slug: string): NewsArticle | undefined {
    return this.news.find((n) => n.slug.toLowerCase() === slug.toLowerCase());
  }

  public getNewsById(id: string): NewsArticle | undefined {
    return this.news.find((n) => n.id === id);
  }

  public addNews(newArticle: Omit<NewsArticle, 'id'>): NewsArticle {
    const article: NewsArticle = {
      ...newArticle,
      id: `news-${Date.now()}`
    };
    this.news.unshift(article);
    this.saveNewsToStorage();
    return article;
  }

  public updateNews(id: string, updatedFields: Partial<NewsArticle>): NewsArticle | null {
    const index = this.news.findIndex((n) => n.id === id);
    if (index === -1) return null;
    this.news[index] = {
      ...this.news[index],
      ...updatedFields
    };
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
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  }

  public setAdminAuthenticated(auth: boolean) {
    try {
      if (auth) {
        localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      } else {
        localStorage.removeItem(ADMIN_AUTH_KEY);
      }
      this.notify();
    } catch (e) {
      console.error(e);
    }
  }

  // Backup & Restore
  public exportData(): string {
    return JSON.stringify({
      version: '1.0',
      exportedAt: new Date().toISOString(),
      games: this.games,
      news: this.news
    }, null, 2);
  }

  public importData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed.games) && Array.isArray(parsed.news)) {
        this.games = parsed.games;
        this.news = parsed.news;
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
    this.games = [...INITIAL_GAMES];
    this.news = [...INITIAL_NEWS];
    this.saveGamesToStorage();
    this.saveNewsToStorage();
  }
}

export const storageService = new StorageService();
