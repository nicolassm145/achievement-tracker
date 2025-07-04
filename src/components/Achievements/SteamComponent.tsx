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
    // tenta recuperar do cache
    const cached = sessionStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : [];
  });
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(15);

  useEffect(() => {
    if (loading || !user?.steamid) return;
    // Se já existe cache, não refaz a chamada
    if (cards.length > 0) return;

    const steamid = String(user.steamid);
    Promise.all([
      api.get<{ games: OwnedGame[] }>(`/steam/profile/games/${steamid}`),
      api.get<AchievementGame[]>(`/steam/profile/achievements/${steamid}`),
    ])
      .then(([gamesRes, achRes]) => {
        const ownedGames = gamesRes.data.games || [];
        const achGames = achRes.data;
        const achMap = new Map<number, AchievementGame>();
        achGames.forEach((ag) => achMap.set(ag.appid, ag));

        // Monta array de cards, já filtrando só quem tem conquistas e ordenando pelo último unlock
        const withTs = ownedGames.map(g => {
          const ag = achMap.get(g.appid);
          const unlocks = ag?.achievements.map(a => a.unlocktime) || [];
          const lastTsSec = unlocks.length ? Math.max(...unlocks) : 0;
          const lastTsMs = lastTsSec * 1000;

          // Se não tem conquistas, vamos ignorar depois
          const bannerUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${g.appid}/header.jpg`;
          const timePlayed = `${Math.floor(g.playtime_forever / 60)}h ${g.playtime_forever % 60}m`;
          const completion = ag
            ? Math.round((ag.achieved_achievements / ag.total_achievements) * 100)
            : 0;
          const trophyIcons = ag
            ? ag.achievements.filter(a => a.achieved === 1)
                .map(a => a.icon || a.icongray || '')
            : [];
          const lastPlayed = lastTsSec
            ? new Date(lastTsMs).toLocaleDateString('pt-BR')
            : '-';

          const card: GameCardProps = {
            bannerUrl,
            title: g.name,
            timePlayed,
            completion,
            lastPlayed,
            trophyIcons,
          };

          return { card, lastTsMs };
        });

        // Filtra só quem teve conquistas (lastTsMs>0), ordena do mais recente e extrai o card
        const filtered = withTs
          .filter(x => x.lastTsMs > 0)
          .sort((a, b) => b.lastTsMs - a.lastTsMs)
          .map(x => x.card);

        setCards(filtered);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      })
      .catch((err) => {
        console.error(err);
        setError('Não foi possível carregar seus jogos Steam.');
      });
  }, [loading, user?.steamid, cards.length]);

  if (loading) return <div>Carregando perfil...</div>;
  if (!user?.steamid)
    return (
      <div>
        Você ainda não vinculou seu SteamID em configurações.
        <br />
        Valor atual de user.steamid: <code>{JSON.stringify(user?.steamid)}</code>
      </div>
    );
  if (error) return <div className="text-red-500">{error}</div>;

  const visible = cards.slice(0, visibleCount);

  return (
    <div className="space-y-6 p-4">
      {cards.length === 0 ? (
        <div>Carregando...</div>
      ) : (
        <>
          <div className="space-y-6 p-4">
            {visible.map((card) => (
              <GameCard key={`${card.title}-${card.bannerUrl}`} {...card} />
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
