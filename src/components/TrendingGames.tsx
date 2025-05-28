import { useEffect, useState } from 'react';
import axios from 'axios';

interface Game {
  id: number;
  name: string;
  cover_url: string;
}

const TrendingGames = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios
      .get<Game[]>('http://localhost:8000/igdb/trending')
      .then((res) => setGames(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl px-4">
      <div className="hidden gap-6 sm:grid sm:grid-cols-6">
        {games.slice(0, 6).map((game) => (
          <div key={game.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded transition-transform hover:scale-105">
              <img
                src={game.cover_url}
                alt={game.name}
                className="aspect-[3/4] w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 transition-all duration-200 hover:bg-black/50" />
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto sm:hidden">
        <div className="flex gap-4 pb-2">
          {games.map((game) => (
            <div
              key={game.id}
              className="group w-28 flex-shrink-0 cursor-pointer"
            >
              <div className="relative overflow-hidden rounded transition-transform hover:scale-105">
                <img
                  src={game.cover_url}
                  alt={game.name}
                  className="aspect-[3/4] w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 transition-all duration-200 group-hover:bg-black/50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingGames;
