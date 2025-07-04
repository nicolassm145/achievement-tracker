import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import GameCard, { type GameCardProps } from '../../components/Achievements/GameCardComponent';

interface OwnedGame {
  appid: number;
  name: string;
  playtime_forever: number;
}

interface AchievementGame {
  appid: number;
  achievements: Array<{
    icon: string | null;
    icongray: string | null;
    achieved: number;
    unlocktime: number;
  }>;
  total_achievements: number;
  achieved_achievements: number;
}

const SteamComponent: React.FC = () => {
  const { user, loading } = useAuth();
  const [cards, setCards] = useState<GameCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(15);

  useEffect(() => {
    if (loading || !user?.steamid) return;
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

        const newCards = ownedGames.map<GameCardProps>((g) => {
          const ach = achMap.get(g.appid);
          const bannerUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${g.appid}/header.jpg`;
          const timePlayed = `${Math.floor(g.playtime_forever / 60)}h ${g.playtime_forever % 60}m`;
          const completion = ach
            ? Math.round((ach.achieved_achievements / ach.total_achievements) * 100)
            : 0;
          const trophyIcons = ach
            ? ach.achievements.filter((a) => a.achieved === 1)
                .map((a) => a.icon || a.icongray || '')
            : [];
          const lastPlayed =
            ach && ach.achievements.length
              ? new Date(
                  Math.max(...ach.achievements.map((a) => a.unlocktime)) * 1000
                ).toLocaleDateString('pt-BR')
              : '-';

          return { appid: g.appid, bannerUrl, title: g.name, timePlayed, completion, lastPlayed, trophyIcons };
        });

        setCards(newCards);
      })
      .catch((err) => {
        console.error(err);
        setError('Não foi possível carregar seus jogos Steam.');
      });
  }, [loading, user?.steamid]);

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

  const slice = cards.slice(0, visibleCount);

  return (
    <div className="space-y-6 p-4">
      {cards.length === 0 ? (
        <div>Você não possui jogos ou conquistas cadastradas.</div>
      ) : (
        <>
          <div className="space-y-6 p-4">
            {slice.map((card) => (
              <GameCard key={`${card.title}-${card.bannerUrl}`} {...card} />
            ))}
          </div>

          {visibleCount < cards.length && (
            <div className="mt-4 text-center">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => setVisibleCount((c) => c + 10)}
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
