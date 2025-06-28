import SystemLayout from "../../components/Layout/SystemLayout";
import { useAnticipatedGames } from "../../hooks/useAnticipatedGames";
import { useTranslation } from 'react-i18next';

const AnticipatedPage = () => {
  const { t } = useTranslation();
  const { games, loading, error } = useAnticipatedGames();

  return (
    <SystemLayout>
      <section className="container mx-auto px-4 sm:px-20 lg:px-36 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              {t("anticipatedGames.title")}
            </h2>
            <p className="text-sm text-gray-400 ">
              {t("anticipatedGames.description")}
            </p>
          </div>
        </div>
        <div className="mt-6 mb-6 border-t border-gray-300" />

        {loading && (
          <p className="text-center text-gray-500">Loading games...</p>
        )}
        {error && (
          <p className="text-center text-red-500">Error: {error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {games.map((game) => (
              <div
                key={game.id}
                className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow group"
              >
                <figure className="relative w-full aspect-[3/4] bg-base-300 overflow-hidden">
                  {game.cover_url ? (
                    <img
                      src={game.cover_url}
                      alt={game.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="flex items-center justify-center h-full text-xs text-gray-500">
                      No Cover
                    </span>
                  )}
                  <span className="absolute inset-0 flex items-center justify-center px-2 text-center text-sm font-semibold text-white bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {game.name}
                  </span>
                </figure>
                <div className="card-body p-2 text-center">
                  <p className="text-xs text-gray-400">
                    {new Date(game.release_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </SystemLayout>
  );
};

export default AnticipatedPage;
