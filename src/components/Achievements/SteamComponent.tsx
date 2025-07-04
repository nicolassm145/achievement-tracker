// src/components/Achievements/SteamComponent.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import GameCard, { type GameCardProps } from '../../components/Achievements/GameCardComponent';

interface OwnedGame {
  appid: number;
  name: string;
  playtime_forever: number;
}

interface Achievement {
  icon: string | null;
  icongray: string | null;
  achieved: number;
  unlocktime: number;
}

interface AchievementGame {
  appid: number;
  achievements: Achievement[];
  total_achievements: number;
  achieved_achievements: number;
}

const STORAGE_KEY = 'steam_cards_cache';

const SteamComponent: React.FC = () => {
  const { user, loading } = useAuth();
  const [cards, setCards] = useState<GameCardProps[]>(() => {
    const cached = sessionStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : [];
  });
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(15);

  useEffect(() => {
    if (loading || !user?.steamid) return;
    // se já cached, não busca
    if (cards.length > 0) return;

    const steamid = String(user.steamid);
    Promise.all([
      api.get<{ games: OwnedGame[] }>(`/steam/profile/games/${steamid}`),
      api.get<AchievementGame[]>(`/steam/profile/achievements/${steamid}`),
    ])
      .then(([gamesRes, achRes]) => {
        const owned = gamesRes.data.games || [];
        const achGames = achRes.data;
        const achMap = new Map<number, AchievementGame>();
        achGames.forEach(ag => achMap.set(ag.appid, ag));

        const withTs = owned.map(g => {
          const ag = achMap.get(g.appid);
          const unlocks = ag?.achievements.map(a => a.unlocktime) || [];
          const lastSec = unlocks.length ? Math.max(...unlocks) : 0;
          const lastMs = lastSec * 1000;

          const bannerUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${g.appid}/header.jpg`;
          const timePlayed = `${Math.floor(g.playtime_forever / 60)}h ${g.playtime_forever % 60}m`;
          const completion = ag
            ? Math.round((ag.achieved_achievements / ag.total_achievements) * 100)
            : 0;
          const trophyIcons = ag
            ? ag.achievements.filter(a => a.achieved === 1).map(a => a.icon || a.icongray || '')
            : [];
          const lastPlayed = lastSec ? new Date(lastMs).toLocaleDateString('pt-BR') : '-';

          return { card: { bannerUrl, title: g.name, timePlayed, completion, lastPlayed, trophyIcons } as GameCardProps, lastMs };
        });

        const filtered = withTs
          .filter(x => x.lastMs > 0)
          .sort((a, b) => b.lastMs - a.lastMs)
          .map(x => x.card);

        setCards(filtered);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      })
      .catch(err => {
        console.error(err);
        const status = err.response?.status;
        if (status === 404) {
          // perfil existente mas sem jogos/conquistas
          setError(null);
          setCards([]);
        } else {
          setError('Não foi possível carregar seus jogos Steam.');
        }
      });
  }, [loading, user?.steamid]);

  if (loading) return <div>Carregando perfil...</div>;
  if (!user?.steamid) {
    return (
      <div>
        Você ainda não vinculou seu SteamID em configurações.
        <br />
        Valor atual de user.steamid: <code>{JSON.stringify(user?.steamid)}</code>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : cards.length === 0 ? (
        <div>Você não possui jogos Steam ou conquistas cadastradas.</div>
      ) : (
        <>
          <div className="space-y-6 p-4">
            {cards.slice(0, visibleCount).map((card, idx) => (
              <GameCard key={`${card.title}-${idx}`} {...card} />
            ))}
          </div>
          {visibleCount < cards.length && (
            <div className="mt-4 text-center">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => setVisibleCount(c => c + 10)}
              >
                Mostrar mais (+10)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SteamComponent;