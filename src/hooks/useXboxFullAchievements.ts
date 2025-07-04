import { useState, useEffect } from "react";
import { getXboxAllAchievements } from "../services/api";

export function useXboxAllAchievements(xuid: string) {
  const [games, setGames] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setGames([]);
    setPage(1);
    setHasMore(true);
  }, [xuid]);

  useEffect(() => {
    if (!xuid || !hasMore) return;
    setLoading(true);
    getXboxAllAchievements(xuid, page)
      .then((data) => {
        if (!data.jogos || data.jogos.length < 5) setHasMore(false);
        setGames((prev) => [...prev, ...(data.jogos || [])]);
      })
      .finally(() => setLoading(false));
  }, [xuid, page]);

  const loadMore = () => {
    if (hasMore && !loading) setPage((p) => p + 1);
  };

  return { games, loading, hasMore, loadMore };
} 