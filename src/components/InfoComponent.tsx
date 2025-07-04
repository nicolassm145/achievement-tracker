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

      // 1) Ler do cache
      const rawStats = sessionStorage.getItem(STATS_CACHE_KEY(sid));
      const parsedStats = rawStats
        ? (JSON.parse(rawStats) as GeneralStats)
        : null;
      if (parsedStats) {
        setStats(parsedStats);
      }

      try {
        // 2) Buscar lista de jogos (se não tiver no cache)
        let allGames: Game[] = [];
        const rawGames = sessionStorage.getItem(GAMES_CACHE_KEY(sid));
        if (rawGames) {
          allGames = JSON.parse(rawGames);
        } else {
          const gamesRes = await api.get<{ games: Game[] }>(
            `/steam/profile/games/${sid}`
          );
          allGames = gamesRes.data.games || [];
          sessionStorage.setItem(
            GAMES_CACHE_KEY(sid),
            JSON.stringify(allGames)
          );
        }

        // 3) Buscar estatísticas gerais (se não tiver no cache)
        let general = parsedStats;
        if (!general) {
          const statsRes = await api.get<{
            general_stats: GeneralStats;
          }>(`/steam/general-stats/${sid}`);
          general = statsRes.data.general_stats;
          sessionStorage.setItem(STATS_CACHE_KEY(sid), JSON.stringify(general));
          setStats(general);
        }

        // 4) Processar os 4 jogos mais jogados nas últimas 2 semanas
        const recent = allGames
          .filter((g) => g.playtime_2weeks > 0)
          .sort((a, b) => b.playtime_2weeks - a.playtime_2weeks)
          .slice(0, 4);

        // 5) Buscar capas via IGDB
        const gamesWithCover = await Promise.all(
          recent.map(async (g) => {
            try {
              const resp = await api.get<
                { id: number; name: string; cover_url?: string }[]
              >('/igdb/search', { params: { q: g.name } });
              return { ...g, cover_url: resp.data[0]?.cover_url };
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
    return (
      <div className="mt-10 flex items-center text-2xl gap-2">
        <span className="loading loading-spinner loading-xs"></span>
        <span className="text-sm font-semibold">Carregando Informações</span>
      </div>
    );
  }

  if (!stats) {
    return (
      <p className="mt-10 text-center text-red-500">{t('infoProfile.error')}</p>
    );
  }

  // Converter minutos para Xh Ym
  const hours = Math.floor(stats.total_hours / 60);
  const minutes = stats.total_hours % 60;
  const formattedHours = `${hours}h ${minutes}m`;

  // Garantir ao menos 4 slots no carrossel
  const displayGames = [...latestGames];
  while (displayGames.length < 3) displayGames.push(null as any);

  return (
    <section className="text-base-content">
      <div className="container mx-auto mt-10 px-4">
        <p className="mb-6 text-center text-base sm:text-lg">
          {t('infoProfile.msg')}
          <a className="font-bold text-blue-500" href="/profile">
            {' '}
            {user?.username ?? 'Usuário'}{' '}
          </a>
        </p>

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="grid grid-cols-2 gap-x-15 gap-y-4 sm:grid-cols-3 lg:grid-cols-3">
            <Stat
              label={t('infoProfile.ownedGames')}
              tip={t('infoProfile.tipsGame')}
              value={stats.total_games}
            />
            <Stat
              label={t('infoProfile.completedGames')}
              tip={t('infoProfile.tipsCompleted')}
              value={stats.total_platinums}
            />
            <Stat
              label={t('infoProfile.playing')}
              tip={t('infoProfile.tipsPlaying')}
              value={stats.recent_games}
            />
            <Stat
              label={t('infoProfile.trophies')}
              tip={t('infoProfile.tipsTrophy')}
              value={stats.total_achievements}
            />
            <Stat
              label={t('infoProfile.hoursPlayed')}
              tip={t('infoProfile.tipsHours')}
              value={formattedHours}
            />
            <Stat
              label={t('infoProfile.average')}
              tip={t('infoProfile.tipsAverage')}
              value={`${stats.avg_platinums}%`}
            />
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
                      className="h-24 w-16 rounded-lg object-cover shadow-lg transition-transform hover:scale-105 sm:h-32 sm:w-24"
                    />
                  ) : (
                    <div className="h-24 w-16 rounded-lg bg-gray-200 shadow-lg sm:h-32 sm:w-24" />
                  )}
                </div>
              ))}
            </div>
            <p className="mt-2 text-center text-sm sm:text-base">
              {t('infoProfile.latestGames')}
            </p>
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
