import { useState, useEffect } from 'react';
import type { Game } from '../types/Game';

export function useUpcomingGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGames() {
      try {
        setLoading(true);
        const apiBaseUrl =
          import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
        const res = await fetch(`${apiBaseUrl}/igdb/upcoming`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data: Game[] = await res.json();
        setGames(data);
      } catch (err: any) {
        setError(err.message ?? 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, []);

  return { games, loading, error };
}
