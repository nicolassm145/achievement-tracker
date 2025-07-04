// src/components/Achievements/GameCardComponent.tsx

import React from 'react';

export interface GameCardProps {
  bannerUrl: string;
  title: string;
  timePlayed: string;    // e.g. "135h 37m"
  completion: number;    // 0-100
  lastPlayed: string;    // e.g. "May 6, 2025"
  trophyIcons: string[]; // array de URLs de ícone, em ordem cronológica de unlock
}

const GameCard: React.FC<GameCardProps> = ({
  bannerUrl,
  title,
  timePlayed,
  completion,
  lastPlayed,
  trophyIcons,
}) => {

  const latestTrophies = trophyIcons.slice(-20);

  return (
    <div className="bg-base-300 rounded-lg shadow-lg overflow-hidden w-full">
      <div className="flex flex-col md:flex-row p-3 bg-base-200">
        <img
          src={bannerUrl}
          alt={`${title} banner`}
          className="w-full md:w-40 h-20 object-cover rounded-md"
        />
        <div className="flex-1 mt-3 md:mt-0 md:ml-4">
          <h2 className="text-md md:text-lg font-bold">{title}</h2>
          <div className="flex items-center mt-1 space-x-2">
            <span className="text-xs">{timePlayed}</span>
          </div>
          <div className="flex items-center mt-1">
            <span className="text-xs mr-1">{completion}%</span>
            <div className="flex-1 h-1.5 bg-base-100 rounded overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${completion}%` }}
              />
            </div>
            <span className="text-xs ml-1">{lastPlayed}</span>
          </div>
        </div>
      </div>

      <div className="p-3 bg-base-100">
        <div className="flex space-x-1 overflow-x-auto">
          {latestTrophies.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`Trophy ${idx + 1}`}
              className="w-7 h-7 rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
