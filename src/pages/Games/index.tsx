import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SystemLayout from '../../components/Layout/SystemLayout';
import LoadingSpinner from '../../components/LoddingComponent';
import ErrorMessage from '../../components/ErrorMessageComponent';
import { useGameDetails } from '../../hooks/useGameDetails';

const GamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { game, loading, error } = useGameDetails(Number(gameId));
  const [currentShot, setCurrentShot] = useState(0);

  useEffect(() => {
    if (!game?.screenshots.length) return;
    const interval = setInterval(() => {
      setCurrentShot((idx) => (idx + 1) % game.screenshots.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [game]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!game) return <div className="p-8 text-center">Game not found</div>;

  const bannerUrl = game.screenshots.length
    ? game.screenshots[currentShot].url
    : game.cover_url;

  return (
    <SystemLayout>
      <div className="relative -mt-20 h-54 w-full overflow-hidden sm:h-64 md:h-96 lg:h-128">
        <img
          src={bannerUrl}
          alt={`Banner ${currentShot + 1}`}
          className="h-full w-full object-cover transition-opacity duration-700"
        />
        <div className="via-black-100/80 to-base-100 absolute inset-0 bg-gradient-to-b from-transparent" />
      </div>

      <div className="relative mx-auto -mt-8 px-4 sm:-mt-28 sm:px-8 md:-mt-32 lg:-mt-36 lg:px-36">
        <div className="profile-card bg-base-100 shadow-xl md:p-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 md:items-start">
            <img
              alt={`${game.name} cover`}
              src={game.cover_url || '/avatar.png'}
              className="border-base-100 -mt-25 h-40 w-32 border-3 object-cover shadow-md"
            />
            <div className="-mt-2 text-center sm:text-left">
              <h1 className="-ml-1 text-xl font-bold sm:text-2xl md:text-3xl">
                {game.name}
              </h1>
              <p className="mt-1 text-base">
                Released on{' '}
                <span className='font-semibold'>
                  {game.release_date
                    ? new Date(game.release_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric',
                      })
                    : 'Unknown'}{' '}
                </span>
                by{' '}
                <span className="font-bold">
                  {game.companies.map((c) => c).join(', ')}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-8 px-5 md:flex-row md:gap-6">
            <div className="md:w-4/5">
              <h2 className="mb-2 text-lg font-semibold">Resumo</h2>
              <p className="text-justify text-base">
                {game.summary || 'Sem descrição disponível.'}
              </p>
            </div>

            <div className="space-y-6 md:w-2/5">
              <div>
                <h3 className="mb-2 text-xl font-bold">Plataformas</h3>
                <div className="flex flex-wrap gap-2">
                  {game.platforms.map((plat) => (
                    <span
                      key={plat.name}
                      className="badge badge-outline badge-sm"
                    >
                      {plat.name}
                    </span>
                  ))}
                </div>
              </div>

              {game.similar_games.length > 0 && (
                <div>
                  <h3 className="mb-2 text-xl font-bold">Jogos Similares</h3>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                    {game.similar_games.slice(0, 8).map((sim) => (
                      <Link
                        key={sim.id}
                        to={`/games/${sim.id}`}
                        className="block aspect-[5/6] w-full overflow-hidden rounded-lg shadow-sm"
                      >
                        <img
                          src={sim.cover_url || '/avatar.png'}
                          alt={sim.name}
                          className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </SystemLayout>
  );
};

export default GamePage;
