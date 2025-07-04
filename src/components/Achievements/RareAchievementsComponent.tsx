// src/components/Achievements/RareAchievementsComponent.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

interface RareAchievement {
  apiname: string;
  name: string;
  description: string;
  icon: string | null;
  icongray: string | null;
  unlocktime: number;
  global_percentage: number | string;
}

interface GameRareInfo {
  appid: number;
  game_name: string;
  rare_achievements: RareAchievement[];
  total_rare: number;
}

interface RareResponse {
  steam_id: string;
  rarity_threshold: string;
  total_games_with_rare: number;
  total_rare_achievements: number;
  games: GameRareInfo[];
}

const STORAGE_KEY = 'steam_rare_achievements_cache';

const RareAchievementsComponent: React.FC = () => {
  const { user, loading } = useAuth();
  const [data, setData] = useState<RareResponse | null>(() => {
    const cached = sessionStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : null;
  });
  const [error, setError] = useState<string | null>(null);
  const [visibleGames, setVisibleGames] = useState(5);

  useEffect(() => {
    if (loading || !user?.steamid) return;
    if (data) return;

    const steamid = String(user.steamid);
    api
      .get<RareResponse>(`/steam/profile/rare-achievements/${steamid}`)
      .then((resp) => {
        setData(resp.data);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(resp.data));
      })
      .catch((err) => {
        console.error(err);
        setError('Não foi possível carregar conquistas raras.');
      });
  }, [loading, user?.steamid, data]);

  if (loading) return <div>Carregando conquistas raras...</div>;
  if (!user?.steamid) return <div>SteamID não vinculado.</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!data || data.games.length === 0)
    return (
      <div className="bg-base-100 rounded p-4">
        <h2 className="mb-4 text-2xl font-bold">Conquistas Raras</h2>
        <p>Você não possui conquistas raras (&lt;10%).</p>
      </div>
    );

  const slice = data.games.slice(0, visibleGames);

  return (
    <div className="bg-base-100 space-y-4 rounded p-4">
      <h2 className="text-2xl font-bold">Conquistas Raras</h2>

      <p className="text-sm">
        Jogos com conquistas raras: {data.total_games_with_rare}
        <br />
        Total de conquistas: {data.total_rare_achievements}
      </p>
      <div className="border-t" />
      <div className="space-y-6">
        {slice.map((game) => (
          <div
            key={game.appid}
            className="border-base-300 overflow-hidden rounded-lg border"
          >
            <div className="bg-base-200 flex items-center justify-between p-3">
              <span className="font-semibold">{game.game_name}</span>
              <span className="text-sm font-bold">{game.total_rare}</span>
            </div>

            <div className="p-3 space-y-2">
              {game.rare_achievements.map((ach, idx) => {
                const perc =
                  typeof ach.global_percentage === 'number'
                    ? ach.global_percentage
                    : parseFloat(String(ach.global_percentage));
                const displayPerc = isNaN(perc)
                  ? '-'
                  : perc.toFixed(1) + '%';

                return (
                  <div
                    key={ach.apiname + idx}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        src={ach.icon || ach.icongray || ''}
                        alt={ach.name}
                        className="h-6 w-6 rounded"
                      />
                      <span className="text-xs font-medium">
                        {ach.name}
                      </span>
                    </div>
                    <span className="text-[10px]">{displayPerc}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {visibleGames < data.games.length && (
          <div className="text-center">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setVisibleGames((v) => v + 5)}
            >
              Mostrar mais jogos raros (+5)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RareAchievementsComponent;