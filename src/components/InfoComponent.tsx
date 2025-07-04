import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

interface GeneralStats {
  total_games: number;
  total_platinums: number;
  recent_games: number;
  total_achievements: number;
  total_hours: number; // em minutos
  avg_platinums: number;
}

interface Game {
  appid: number;
  name: string;
  playtime_2weeks: number;
  cover_url?: string;
}

const STATS_CACHE_KEY = (steamid: string) => `steam_stats_${steamid}`;
const GAMES_CACHE_KEY = (steamid: string) => `steam_games_${steamid}`;

const InfoComponent: React.FC = () => {
  const { t } = useTranslation();
  const { user, token, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<GeneralStats | null>(null);
  const [latestGames, setLatestGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSteamData = async () => {
      if (!user?.steamid) {
        setLoading(false);
        return;
      }
      const sid = user.steamid;

      // Tentar cache
      const cachedStats = sessionStorage.getItem(STATS_CACHE_KEY(sid));
      const cachedGames = sessionStorage.getItem(GAMES_CACHE_KEY(sid));
      let allGames: Game[] = [];

      if (cachedStats && cachedGames) {
        try {
          setStats(JSON.parse(cachedStats));
          allGames = JSON.parse(cachedGames);
        } catch {
          // cache corrompido -> continuar
        }
      }

      try {
        if (!allGames.length) {
          // fetch Steam
          const gamesRes = await api.get<{ games: Game[] }>(`/steam/profile/games/${sid}`);
          allGames = gamesRes.data.games || [];
          sessionStorage.setItem(GAMES_CACHE_KEY(sid), JSON.stringify(allGames));
        }

        let general = stats;
        if (!general) {
          const statsRes = await api.get<{ general_stats: GeneralStats }>(`/steam/general-stats/${sid}`);
          general = statsRes.data.general_stats;
          sessionStorage.setItem(STATS_CACHE_KEY(sid), JSON.stringify(general));
          setStats(general);
        }

        // Filtrar top 4 jogados últimas 2 weeks
        const recent = allGames
          .filter(g => g.playtime_2weeks > 0)
          .sort((a, b) => b.playtime_2weeks - a.playtime_2weeks)
          .slice(0, 4);

        // Buscar cover via IGDB
        const gamesWithCover = await Promise.all(
          recent.map(async (g) => {
            try {
              const resp = await api.get<{ id: number; name: string; cover_url?: string }[]>('/igdb/search', { params: { q: g.name } });
              const igdb = resp.data[0];
              return { ...g, cover_url: igdb?.cover_url };
            } catch {
              return g;
            }
          })
        );
        setLatestGames(gamesWithCover);
      } catch (error: any) {
        console.error('Erro ao carregar dados Steam ou IGDB:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSteamData();
  }, [user, token]);

  if (authLoading || loading) {
    return <p className="text-center mt-10">{t('loading')}</p>;
  }

  if (!stats) {
    return <p className="text-center mt-10 text-red-500">{t('infoProfile.error')}</p>;
  }

  // Converter minutos para Xh Ym
  const hours = Math.floor(stats.total_hours / 60);
  const minutes = stats.total_hours % 60;
  const formattedHours = `${hours}h ${minutes}m`;

  // Garantir 4 slots
  const displayGames = [...latestGames];
  while (displayGames.length < 3) displayGames.push(null as any);

  return (
    <section className="text-base-content">
      <div className="container mx-auto mt-10 px-4">
        <p className="mb-6 text-center text-base sm:text-lg">
          {t('infoProfile.msg')}
          <a className="text-blue-500 font-bold" href="/profile"> {user?.username ?? 'Usuário'} </a>
        </p>

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="grid grid-cols-2 gap-x-15 gap-y-4 sm:grid-cols-3 lg:grid-cols-3">
            <Stat label={t('infoProfile.ownedGames')} tip={t('infoProfile.tipsGame')} value={stats.total_games} />
            <Stat label={t('infoProfile.completedGames')} tip={t('infoProfile.tipsCompleted')} value={stats.total_platinums} />
            <Stat label={t('infoProfile.playing')} tip={t('infoProfile.tipsPlaying')} value={stats.recent_games} />
            <Stat label={t('infoProfile.trophies')} tip={t('infoProfile.tipsTrophy')} value={stats.total_achievements} />
            <Stat label={t('infoProfile.hoursPlayed')} tip={t('infoProfile.tipsHours')} value={formattedHours} />
            <Stat label={t('infoProfile.average')} tip={t('infoProfile.tipsAverage')} value={`${stats.avg_platinums}%`} />
            <div className="col-span-full flex justify-center text-sm sm:text-base">
              <p>{t('infoProfile.profile')}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between">
            <div className="carousel carousel-center w-full space-x-2 px-1 py-2 sm:space-x-4 sm:px-4">
              {displayGames.map((game, idx) => (
                <div key={idx} className="carousel-item shrink-0">
                  {game && game.cover_url ? (
                    <img
                      src={game.cover_url}
                      alt={game.name}
                      className="h-24 w-16 rounded-lg shadow-lg object-cover hover:scale-105 transition-transform sm:h-32 sm:w-24"
                    />
                  ) : (
                    <div className="h-24 w-16 bg-gray-200 rounded-lg shadow-lg sm:h-32 sm:w-24" />
                  )}
                </div>
              ))}
            </div>
            <p className="mt-2 text-center text-sm sm:text-base">{t('infoProfile.latestGames')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatProps {
  label: string;
  tip: string;
  value: number | string;
}
const Stat: React.FC<StatProps> = ({ label, tip, value }) => (
  <div className="space-y-1 text-center">
    <div className="tooltip text-xs font-medium sm:text-sm" data-tip={tip}>
      {label}
    </div>
    <div className="text-sm font-bold sm:text-lg">{value}</div>
  </div>
);

export default InfoComponent;