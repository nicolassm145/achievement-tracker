// src/components/Achievements/GameCardComponent.tsx

import React from 'react';

export interface GameCardProps {
  bannerUrl?: string;
  title: string;
  timePlayed: string;    // e.g. "135h 37m"
  completion: number;    // 0-100
  lastPlayed: string;    // e.g. "May 6, 2025"
  trophyIcons: string[]; // array de URLs de ícone, em ordem cronológica de unlock
}

const placeholderBanner = (
  <div className="w-full md:w-40 h-20 bg-gray-300 rounded-md flex items-center justify-center">
    <span className="text-gray-500 text-sm">Sem Imagem</span>
  </div>
);

const placeholderTrophy = (
  <div className="w-7 h-7 bg-gray-200 rounded flex items-center justify-center">
    <span className="text-gray-400 text-xs">?</span>
  </div>
);

export default function GameCard({
  bannerUrl,
  title,
  timePlayed,
  completion,
  lastPlayed,
  trophyIcons,
}: GameCardProps) {
  const latestTrophies = trophyIcons.slice(-20);

  return (
    <div className="bg-base-300 rounded-lg shadow-lg overflow-hidden w-full">
      <div className="flex flex-col md:flex-row p-3 bg-base-200">
        {/* Banner ou placeholder */}
        {bannerUrl ? (
          <img
            src={bannerUrl}
            alt={`${title} banner`}
            className="w-full md:w-40 h-20 object-cover rounded-md"
            onError={(e) => {
              e.currentTarget.onerror = null;
              const placeholderDiv = document.createElement('div');
              placeholderDiv.className = "w-full md:w-40 h-20 bg-gray-300 rounded-md flex items-center justify-center";
              const span = document.createElement('span');
              span.className = "text-gray-500 text-sm";
              span.textContent = "Sem Imagem";
              placeholderDiv.appendChild(span);
              e.currentTarget.replaceWith(placeholderDiv);
            }}
          />
        ) : (
          placeholderBanner
        )}

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
          {latestTrophies.length > 0 ? (
            latestTrophies.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Trophy ${idx + 1}`}
                className="w-7 h-7 rounded"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><rect width="100%" height="100%" fill="%23e5e7eb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="14">?</text></svg>';
                }}
              />
            ))
          ) : (
            Array.from({ length: 20 }).map((_, idx) => (
              <React.Fragment key={idx}>{placeholderTrophy}</React.Fragment>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
