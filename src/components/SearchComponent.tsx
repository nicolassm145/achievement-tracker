/* SearchComponent.tsx updated to display dropdown results for both inline and mobile modes */
import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Game {
  id: number;
  name: string;
  cover_url?: string;
}

interface SearchComponentProps {
  className?: string;
  inline?: boolean;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ className = '', inline = false }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Game[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch suggestions on query change with debounce
  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }
    const fetchGames = async () => {
      try {
        const resp = await api.get<Game[]>('/igdb/search', { params: { q: query } });
        setResults(resp.data);
      } catch (err) {
        console.error('Erro ao buscar jogos', err);
      }
    };
    const debounce = setTimeout(fetchGames, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length === 0) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsOpen(false);
  };

  // Inline mode for desktop: show input + dropdown
  if (inline) {
    return (
      <div className={`relative ${className}`}>  
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('header.search')}
            className="input input-bordered input-sm w-full rounded-full"
          />
        </form>
        {query.length >= 3 && (
          <ul className="absolute bg-base-100 mt-1 w-full max-h-60 overflow-y-auto rounded-lg shadow-lg z-50">
            {results.map((game) => (
              <li
                key={game.id}
                className="hover:bg-base-200 cursor-pointer rounded p-1"
                onClick={() => navigate(`/games/${game.id}`)}
              >
                {game.name}
              </li>
            ))}
            {results.length === 0 && (
              <li className="p-1 text-sm text-gray-500">
                {t('header.loading')}
              </li>
            )}
          </ul>
        )}
      </div>
    );
  }

  // Dropdown mode for mobile
  return (
    <div className={`${className} flex items-center`}>  
      <button className="btn btn-ghost p-2" onClick={() => setIsOpen((prev) => !prev)}>
        <MagnifyingGlassIcon className="h-6 w-6" />
      </button>
      {isOpen && (
        <div className="dropdown-content bg-base-100 fixed top-16 left-1/2 z-50 mt-2 w-64 -translate-x-1/2 rounded-lg p-2 shadow-lg">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('header.search')}
              autoFocus
              className="input input-bordered input-xs w-full rounded-full mb-2"
            />
          </form>
          <ul className="max-h-60 overflow-y-auto">
            {results.map((game) => (
              <li
                key={game.id}
                className="hover:bg-base-200 cursor-pointer rounded p-1"
                onClick={() => navigate(`/games/${game.id}`)}
              >
                {game.name}
              </li>
            ))}
            {results.length === 0 && query.length >= 3 && (
              <li className="p-1 text-sm text-gray-500">
                {t('header.loading')}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
