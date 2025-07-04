import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useXboxAllAchievements } from '../../hooks/useXboxFullAchievements';

const INITIAL_VISIBLE = 12;

const XboxComponent: React.FC = () => {
  const { user, loading } = useAuth();
  const {
    games,
    loading: loadingGames,
    hasMore,
    loadMore,
  } = useXboxAllAchievements(user?.xboxId ?? '');

  const [error, setError] = useState<string | null>(null);
  const [visibleAchievements, setVisibleAchievements] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    if (!user?.xboxId) {
      setError(null);
      setVisibleAchievements({});
    }
  }, [user?.xboxId]);

 
  if (loading) return <div>Loading profile...</div>;
  if (!user?.xboxId) {
    return (
      <div>
        Vincule seu XUID em configurações.
        <br />
        XUID: <code>{user?.xboxId ?? '-'}</code>
      </div>
    );
  }
  if (error) return <div className="text-red-500">{error}</div>;
  if (games.length === 0 && loadingGames)
    return <div>Loading games...</div>;
  if (games.length === 0) return <div>Nenhum jogo 100% encontrado.</div>;

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-6">
        {games.map((game) => {
          const shown = visibleAchievements[game.title] ?? INITIAL_VISIBLE;
          const achs = game.achievements || [];
          const visibleList = achs.slice(0, shown);

          return (
            <div key={game.title} className="mb-4 rounded border p-4">
              <div className="mb-2 flex items-center">
                <img
                  src={game.displayImage}
                  alt={game.name}
                  width={50}
                  className="mr-4"
                />
                <div>
                  <div className="font-bold">{game.name}</div>
                  <div className="text-xs">
                    Última vez jogado:{' '}
                    {game.lastTimePlayed
                      ? new Date(game.lastTimePlayed).toLocaleString()
                      : 'N/A'}
                  </div>
                </div>
              </div>

              <div>
                <ul className="mt-2 ml-6 flex list-disc flex-wrap gap-3">
                  {visibleList.length > 0 ? (
                    visibleList.map((ach) => (
                      <li key={ach.id} className="flex items-center gap-2">
                        {ach.mediaAssets?.[0] && (
                          <img
                            src={ach.mediaAssets[0].url}
                            alt={ach.name}
                            width={24}
                            height={24}
                            className="mr-2 inline-block h-8 w-8"
                          />
                        )}
                      </li>
                    ))
                  ) : (
                    <li>No badges unlocked yet</li>
                  )}
                </ul>

                
                {!loadingGames && shown >= achs.length && (
                  <div className="mt-2 text-center text-gray-500">
                    All achievements displayed.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {loadingGames && <div>Loading...</div>}

      {hasMore && !loadingGames && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="mt-4 rounded bg-green-600 px-4 py-2 text-white"
          >
            Show more games
          </button>
        </div>
      )}
      {!hasMore && !loadingGames && (
        <div className="mt-4 text-center text-gray-500">
          All games displayed.
        </div>
      )}
    </div>
  );
};

export default XboxComponent;
