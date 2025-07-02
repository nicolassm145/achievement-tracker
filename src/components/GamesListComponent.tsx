import React from "react";
import { Link } from "react-router-dom";
import type { Game } from "../types/Game";

const GamesList: React.FC<{ items: Game[] }> = ({ items }) => (
  <ul className="space-y-4">
    {items.slice(0, 6).map((g) => (
      <li key={g.id}>
        <Link
          to={`/games/${g.id}`}
          className="flex items-center gap-3 hover:bg-gray-100/35 p-2 rounded-lg transition"
        >
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
        </Link>
      </li>
    ))}
  </ul>
);

export default GamesList;
