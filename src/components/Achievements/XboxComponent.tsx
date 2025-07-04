import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useXboxAllAchievements } from '../../hooks/useXboxFullAchievements';

const INITIAL_VISIBLE = 14;
const INCREMENT = 14;

const XboxComponent: React.FC = () => {
  const { user, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const { games, loading: loadingGames } = useXboxAllAchievements(user?.xboxId ?? '');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  useEffect(() => {
    if (!user?.xboxId) {
      setError(null);
    }
  }, [user?.xboxId]);

  if (loading) return <div>Carregando perfil...</div>;
  if (!user?.xboxId) {
    return (
      <div>
        Vincule seu XUID em configurações.
        <br />
        XUID atual: <code>{user?.xboxId ?? '–'}</code>
      </div>
    );
  }
  if (error) return <div className="text-red-500">{error}</div>;
  if (games.length === 0 && loadingGames) return <div>Carregando conquistas Xbox...</div>;
  if (games.length === 0) return <div>Nenhum jogo 100% encontrado.</div>;

  const visibleGames = games.slice(0, visibleCount);

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-6 p-4">
        {visibleGames.map((t: any) => (
          <div key={t.titleId} className="bg-base-200 rounded p-4 mb-4">
            <div className="flex items-center mb-2">
              <img src={t.displayImage} alt={t.name} width={50} className="mr-4 h-20 w-20 rounded" />
              <div>
                <div className="font-bold">{t.name}</div>
                <div className="text-xs ">
                 Last Time Played: {t.lastTimePlayed ? new Date(t.lastTimePlayed).toLocaleString() : 'N/A'}
                </div>
              </div>
            </div>
            <div className='mt-4'>
              
              <ul className="flex flex-wrap gap-3 p-0 m-0 mt-2 li">
                {t.achievements && t.achievements.length > 0 ? (
                  t.achievements.slice(0, 14).map((ach: any) => (
                    <li key={ach.id} className="flex items-center gap-2">
                      {ach.mediaAssets && ach.mediaAssets.length > 0 && (
                        <img
                          src={ach.mediaAssets[0].url}
                          alt={ach.name}
                          width={24}
                          height={24}
                          className="h-8 w-8"
                        />
                      )}
                    </li>
                  ))
                ) : (
                  <li>Nenhuma conquista encontrada.</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {loadingGames && <div>Carregando mais conquistas...</div>}

      {visibleCount < games.length && (
        <div className="mt-4 text-center">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setVisibleCount(c => c + INCREMENT)}
          >
            Mostrar mais (+{INCREMENT})
          </button>
        </div>
      )}

      {!loadingGames && visibleCount >= games.length && (
        <div className="mt-4 text-gray-500 text-center">Todos os jogos exibidos.</div>
      )}
    </div>
  );
};

export default XboxComponent;
