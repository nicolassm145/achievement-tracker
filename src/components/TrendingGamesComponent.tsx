import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingSkeleton } from './Loading/TrendingSkeleton';
import { Link } from 'react-router-dom';

interface Game {
  id: number;
  name: string;
  cover_url: string;
  total_rating: number;
  total_rating_count: number;
  release_date: string;
}

const TrendingGamesComponent: React.FC = () => {
  const { t } = useTranslation();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/igdb/trending')
      .then(async (res) => {
        if (!res.ok) throw new Error(`Erro ${res.status}`);
        return res.json();
      })
      .then((data: any[]) => {
        setGames(data);
      })
      .catch((err) => {
        console.error(err);
        setError('Não foi possível carregar jogos em alta');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <TrendingSkeleton />;
  }

  if (error) {
    return <TrendingSkeleton />;
  }

  return (
    <section className="items-center">
      <h2 className="mb-2 text-2xl font-bold">{t('homePage.trending')}</h2>
      <p className="mb-6 font-medium">{t('homePage.trendingDescription')}</p>

      <div className="carousel carousel-center max-w-full space-x-4 p-2">
        {games.map((game) => (
          <div key={game.id} className="carousel-item w-40">
            {/* 2. Envolva o conteúdo do card com Link */}
            <Link to={`/games/${game.id}`} className="block h-full">
              <div className="group relative overflow-hidden rounded-xl">
                <img
                  src={game.cover_url}
                  alt={game.name}
                  className="h-56 w-40 object-cover transition-transform duration-200 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/50" />
                
                <span className="absolute inset-0 flex items-center justify-center px-2 text-center text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {game.name}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingGamesComponent;