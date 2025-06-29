// src/pages/GamePage.tsx
import { useParams } from "react-router-dom";
import { useGameDetails } from "../../hooks/useGameDetails";
import LoadingSpinner from "../../components/LoddingSpinner"; // Adicione este componente
import ErrorMessage from "../../components/ErrorMessage"; // Adicione este componente

const GamePage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { game, loading, error } = useGameDetails(Number(gameId));

   console.log({
    gameId,
    loading,
    error,
    game: game ? "Exists" : "Null"
  });
  
  // Estados de carregamento e erro corretos
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!game) return <div className="p-8 text-center">Game not found</div>;

  return (
    <div className="bg-base-100 min-h-screen">
      {/* Capa do jogo */}
      <div className="relative h-96 overflow-hidden">
        {game.cover_url ? (
          <img 
            src={game.cover_url} 
            alt={game.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-gray-800 w-full h-full flex items-center justify-center">
            <span className="text-2xl text-gray-400">No Cover Image</span>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-base-100 to-transparent p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-2">{game.name}</h1>
            <div className="flex flex-wrap gap-2">
              {game.release_date && (
                <span className="badge badge-lg badge-primary">
                  {new Date(game.release_date).toLocaleDateString()}
                </span>
              )}
              {game.companies.map(company => (
                <span key={company} className="badge badge-lg badge-secondary">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Botão Log or Review */}
        <div className="flex justify-end mb-8">
          <button className="btn btn-primary px-8 py-3 text-lg font-bold">
            Log or Review
          </button>
        </div>

        {/* Informações do jogo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-4">Overview</h2>
            <p className="text-lg leading-relaxed">
              {game.summary || "No description available."}
            </p>

            {/* Screenshots */}
            {game.screenshots.length > 0 && (
              <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4">Screenshots</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {game.screenshots.map((screenshot, index) => (
                    <img
                      key={index}
                      src={screenshot.url}
                      alt={`Screenshot ${index + 1}`}
                      className="rounded-lg shadow-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Detalhes à direita */}
          <div className="space-y-6">
            {/* Gêneros */}
            <div>
              <h3 className="text-xl font-bold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {game.genres.map(genre => (
                  <span key={genre.name} className="badge badge-outline">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Plataformas */}
            <div>
              <h3 className="text-xl font-bold mb-2">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {game.platforms.map(platform => (
                  <span key={platform.name} className="badge">
                    {platform.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Jogos similares */}
            {game.similar_games.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-2">Similar Games</h3>
                <div className="space-y-4">
                  {game.similar_games.map(similar => (
                    <div key={similar.id} className="flex items-center gap-4 p-3 bg-base-200 rounded-lg">
                      {similar.cover_url ? (
                        <img 
                          src={similar.cover_url} 
                          alt={similar.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="bg-gray-700 w-16 h-16 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-400">No Image</span>
                        </div>
                      )}
                      <span className="font-medium">{similar.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;