// hooks/useGameDetails.ts
import { useState, useEffect } from 'react';
import type { GameDetails } from '../types/Game';

// src/hooks/useGameDetails.ts
export function useGameDetails(gameId: number) {
  const [game, setGame] = useState<GameDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGameDetails() {
      try {
        setLoading(true);
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
        // CORREÇÃO: Adicione /igdb no caminho
        const res = await fetch(`${apiBaseUrl}/igdb/games/${gameId}`);
        
        console.log(`Status: ${res.status}`); // Log para depuração
        
        if (!res.ok) {
          // Captura a mensagem de erro do backend se existir
          const errorData = await res.json().catch(() => null);
          throw new Error(errorData?.detail || `HTTP error! status: ${res.status}`);
        }
        
        const data: GameDetails = await res.json();
        console.log("Game data:", data); // Log para depuração
        setGame(data);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message ?? "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    }
    
    if (gameId) {
      fetchGameDetails();
    } else {
      setError("ID do jogo inválido");
      setLoading(false);
    }
  }, [gameId]);

  return { game, loading, error };
}