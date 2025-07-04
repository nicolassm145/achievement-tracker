import { useState, useEffect } from "react";
import { getXboxAllAchievements } from "../services/api";

// Estrutura de um jogo conforme retornado pela API
export interface Game {
  id: string;
  title: string;
  achievements: {
    name: string;
    unlocked: boolean;
    unlockDate?: string;
  }[];
  // outros campos conforme necessário
}

// Tipagem da resposta da API
interface XboxAchievementsResponse {
  jogos?: Game[];
}

export function useXboxAllAchievements(xuid: string) {
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Resetar estado quando o xuid muda
  useEffect(() => {
    setGames([]);
    setPage(1);
    setHasMore(true);
  }, [xuid]);

  // Buscar conquistas sempre que xuid ou page mudarem
  useEffect(() => {
    if (!xuid || !hasMore) return;

    const fetchAchievements = async () => {
      setLoading(true);
      try {
        const data = await getXboxAllAchievements(xuid, page) as XboxAchievementsResponse;
        const newGames = data.jogos ?? [];

        // Se vier menos de 5 jogos, não há mais páginas
        if (newGames.length < 5) setHasMore(false);

        setGames((prev) => [...prev, ...newGames]);
      } catch (error: unknown) {
        console.error("Falha ao carregar conquistas Xbox:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [xuid, page, hasMore]);

  const loadMore = () => {
    if (hasMore && !loading) setPage((p) => p + 1);
  };

  return { games, loading, hasMore, loadMore };
}