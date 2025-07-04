// src/components/Achievements/XboxGameCard.tsx
import React, { useState, useEffect } from 'react';
import GameCard, { type GameCardProps } from './GameCardComponent';
import api from '../../services/api';

interface XboxTitle {
  nome: string;
  titleId: string;
  ultimaVezJogado: string;
  conquistas: number;
  totalConquistas: number;
  icone: string;
}

// Aqui renomeei para deixar bem explícito
interface XboxGameCardProps {
  xboxId: string;
  title: XboxTitle;
}

export default function XboxGameCard({ xboxId, title }: XboxGameCardProps) {
  const [trophyIcons, setTrophyIcons] = useState<string[] | null>(null);
  const [loadingAch, setLoadingAch] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [jogos, setJogos] = useState<XboxTitle[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadAchievements = async () => {
    if (trophyIcons !== null) return;
    setLoadingAch(true);
    try {
      const res = await api.get<{
        achievements: {
          unlocked: boolean;
          unlockedDate: string;
          displayImage: string;
        }[];
      }>(`/xbox/profile/achievements/game/${xboxId}/${title.titleId}`);

      const icons = res.data.achievements
        .filter(a => a.unlocked)
        .sort((a, b) =>
          new Date(a.unlockedDate).getTime() - new Date(b.unlockedDate).getTime()
        )
        .map(a => a.displayImage);

      setTrophyIcons(icons);
    } catch {
      setErr('Não foi possível carregar conquistas.');
    } finally {
      setLoadingAch(false);
    }
  };

  const fetchJogos = async (nextPage = 1) => {
    setLoading(true);
    const res = await api.get<{ jogos: XboxTitle[] }>(`/xbox/profile/games-with-full-achievements/${xboxId}?page=${nextPage}&limit=5`);
    setJogos(prev => [...prev, ...res.data.jogos]);
    setLoading(false);
  };

  useEffect(() => {
    fetchJogos(1);
  }, []);

  const cardProps: GameCardProps = {
    bannerUrl: title.icone || '',
    title: title.nome,
    timePlayed: '-',
    completion:
      title.totalConquistas > 0
        ? Math.round((title.conquistas / title.totalConquistas) * 100)
        : 0,
    lastPlayed: title.ultimaVezJogado
      ? new Date(title.ultimaVezJogado).toLocaleDateString('pt-BR')
      : '-',
    trophyIcons: trophyIcons || [],
  };

  return (
    <div className="relative">
      <GameCard {...cardProps} />
      <div className="absolute top-2 right-2">
        <button
          className="btn btn-xs btn-outline"
          onClick={loadAchievements}
          disabled={loadingAch || trophyIcons !== null}
        >
          {loadingAch ? 'Carregando…' : trophyIcons ? 'OK' : 'Ver conquistas'}
        </button>
      </div>
      {err && <p className="text-xs text-red-500 mt-1">{err}</p>}
    </div>
  );
}
