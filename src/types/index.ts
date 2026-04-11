export interface Show {
  id: number;
  name: string;
  summary: string | null;
  image: string | null;
  genres: string[];
  rating: number | null;
  premiered: string | null;
  status: string | null;
  type: string | null;
  language: string | null;
  officialSite: string | null;
  schedule: { time: string | null; days: string[] };
  network: { name: string | null; country: string | null } | null;
  externals: { imdb: string | null; tvrage: string | null; thetvdb: string | null };
  _embedded?: { episodes?: Episode[]; seasons?: SeasonSummary[] };
}

export interface Episode {
  id: number;
  name: string;
  season: number;
  number: number;
  summary: string | null;
  image: string | null;
  airdate: string | null;
  airstime: string | null;
  runtime: number | null;
}

export interface SeasonSummary {
  id: number;
  number: number;
  name: string;
  episodeCount: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    message: string;
    code: string;
  };
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
}

export interface Session {
  user: User;
  sessionId: string;
}

export interface FavoriteList {
  id: string;
  userId: string;
  name: string;
  description?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: { items: number };
}

export interface FavoriteItem {
  id: string;
  listId: string;
  showId: string;
  showData: Show;
  rank?: number;
  comment?: string;
  addedAt: string;
}

export interface WatchlistItem {
  id: string;
  userId: string;
  showId: string;
  showData: Show;
  status: "want_to_watch" | "watching" | "watched";
  addedAt: string;
  updatedAt: string;
}