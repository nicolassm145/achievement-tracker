import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SystemLayout from '../../components/Layout/SystemLayout';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';

interface Game {
  id: number;
  name: string;
  cover_url?: string;
}

const SearchPage: React.FC = () => {
  const { t } = useTranslation();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 3) {
        navigate('/');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await api.get<Game[]>('/igdb/search', {
          params: { q: query },
        });
        setGames(response.data);
      } catch (err: any) {
        console.error('Error fetching search results:', err);
        setError(t('search.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, navigate, t]);

  return (
    <SystemLayout>
      <section className="container mx-auto px-4 sm:px-20 lg:px-36 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              {t('search.title')} <span className="text-primary">{query}</span>
            </h2>
            <p className="text-sm text-gray-400">
              {t('search.description')}
            </p>
          </div>
        </div>
        <div className="mt-6 mb-6 border-t-1" />

        {loading && <p className="text-center">{t('search.loading')}</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && games.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl">{t('search.noResults')}</p>
            <button
              className="btn btn-primary mt-4"
              onClick={() => navigate('/')}
            >
              {t('search.backHome')}
            </button>
          </div>
        )}

        {!loading && !error && games.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {games.map((game) => (
              <Link
                key={game.id}
                to={`/games/${game.id}`}
                className="card rounded border-2 bg-base-200 shadow-sm hover:shadow-md transition-shadow group"
              >
                <figure className="relative w-full aspect-[3/4] bg-base-300 overflow-hidden">
                  {game.cover_url ? (
                    <img
                      src={game.cover_url}
                      alt={game.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="flex items-center justify-center h-full text-xs">
                      {t('search.noCover')}
                    </span>
                  )}
                  <span className="absolute inset-0 flex items-center justify-center px-2 text-center text-sm font-semibold text-white bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-85">
                    {game.name}
                  </span>
                </figure>
              
              </Link>
            ))}
          </div>
        )}
      </section>
    </SystemLayout>
  );
};

export default SearchPage;
