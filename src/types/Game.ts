export interface Game {
  id: number;
  name: string;
  release_date: string;
  cover_url: string;
}

// types/Game.ts
export type GameDetails = {
  id: number;
  name: string;
  summary?: string;
  cover_url?: string;
  release_date?: string;
  genres: { name: string }[];
  platforms: { name: string }[];
  companies: string[];
  screenshots: { url: string }[];
  similar_games: {
    id: number;
    name: string;
    cover_url?: string;
  }[];
};