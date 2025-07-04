import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useXboxAllAchievements } from '../../hooks/useXboxFullAchievements';



const XboxComponent: React.FC = () => {
  const { user, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const { games, loading: loadingGames, hasMore, loadMore } = useXboxAllAchievements(user?.xboxId ?? '');

  useEffect(() => {
    if (!user?.xboxId) {
      setError(null);
    }
  }, [user?.xboxId]);

  if (loading) return <div>Carregando perfil...</div>;
  if (!user?.xboxId)
    return (
      <div>
        Vincule seu XUID em configurações.
        <br />
        XUID atual: <code>{user?.xboxId ?? '–'}</code>
      </div>
    );
  if (error) return <div className="text-red-500">{error}</div>;
  if (games.length === 0 && loadingGames) return <div>Carregando conquistas Xbox...</div>;
  if (games.length === 0) return <div>Nenhum jogo 100% encontrado.</div>;

  return (
    <div className="space-y-6 p-4">

      <div className="space-y-6 p-4">
        {games.map((t: any) => (
          <div key={t.titleId} className="border rounded p-4 mb-4">
            <div className="flex items-center mb-2">
              <img src={t.displayImage} alt={t.name} width={50} className="mr-4" />
              <div>
                <div className="font-bold">{t.name}</div>
                <div className="text-xs text-gray-500">Última vez jogado: {t.lastTimePlayed ? new Date(t.lastTimePlayed).toLocaleString() : 'N/A'}</div>
              </div>
            </div>
            <div>
              <strong className=''>Conquistas:</strong>
              <ul className="flex flex-wrap gap-3 p-0 m-0 mt-2 li">
                {t.achievements && t.achievements.length > 0 ? (
                  t.achievements.map((ach: any) => (
                    <li key={ach.id} className="flex items-center gap-2">
                      {ach.mediaAssets && ach.mediaAssets.length > 0 && (
                        <img src={ach.mediaAssets[0].url} alt={ach.name} width={24} height={24} className="flex outline h-8 w-8" />
                      )}{ach.progressState === 'Achieved'}
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
      {loadingGames && <div>Carregando mais jogos...</div>}
      {hasMore && !loadingGames && (
        <button onClick={loadMore} className="mt-4 px-4 py-2 bg-green-600 text-white rounded">Carregar mais</button>
      )}
      {!hasMore && <div className="mt-4 text-gray-500">Todos os jogos carregados.</div>}
    </div>
  );
};

export default XboxComponent;