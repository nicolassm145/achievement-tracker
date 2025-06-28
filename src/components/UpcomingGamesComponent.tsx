import React from "react";
import { useTranslation } from "react-i18next";
import { useUpcomingGames } from "../hooks/useUpcomingGames";
import { useAnticipatedGames } from "../hooks/useAnticipatedGames";
import type { Game } from "../types/Game";

const GamesList: React.FC<{ items: Game[] }> = ({ items }) => (
  <ul className="space-y-4">
    {items.slice(0, 6).map((g) => (
      <li key={g.id} className="flex items-center gap-3">
        <img
          src={g.cover_url}
          alt={g.name}
          className="h-16 w-12 flex-shrink-0 rounded-lg object-cover"
        />
        <div>
          <p className="text-sm font-bold">{g.name}</p>
          <p className="text-xs">
            {new Date(g.release_date).toLocaleDateString("pt-BR")}
          </p>
        </div>
      </li>
    ))}
  </ul>
);

const UpcomingGamesComponent: React.FC = () => {
  const { t } = useTranslation();
  const { games: upcoming, loading: loadingUp, error: errorUp } = useUpcomingGames();
  const { games: anticipated, loading: loadingAn, error: errorAn } = useAnticipatedGames();

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-start md:gap-6">
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">{t("homePage.comingSoon")}</h2>
            <button className="btn btn-link btn-sm" onClick={() => window.location.href = "/coming-soon"}>
              {t("homePage.seeMore")}
            </button>
          </div>

          {loadingUp && <p>Carregando...</p>}
          {errorUp && <p className="text-red-500">{errorUp}</p>}
          {!loadingUp && !errorUp && <GamesList items={upcoming} />}
        </div>

        <div className="divider lg:divider-horizontal"></div>

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">
              {t("homePage.mostAnticipated")}
            </h2>
            <button className="btn btn-link btn-sm" onClick={() => window.location.href = "/anticipated"}>
              {t("homePage.seeMore")}
            </button>
          </div>

          {loadingAn && <p>Carregando...</p>}
          {errorAn && <p className="text-red-500">{errorAn}</p>}
          {!loadingAn && !errorAn && <GamesList items={anticipated} />}
        </div>
      </div>
    </section>
  );
};

export default UpcomingGamesComponent;
