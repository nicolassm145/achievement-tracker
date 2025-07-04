// src/components/Achievements/XboxComponent.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import XboxGameCard from './XboxGameCard';

interface XboxTitle {
  nome: string;
  titleId: string;
  ultimaVezJogado: string;
  conquistas: number;
  totalConquistas: number;
  icone: string;
}


const XboxComponent: React.FC = () => {
  const { user, loading } = useAuth();
  const [titles, setTitles] = useState<XboxTitle[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user?.xboxId) {
      // limpa estado e cache se o usuário desvinculou o Xbox
      setTitles([]);
      return;
    }

    



    // não tinha cache ⇒ busca do back
    setError(null);
    api
      .get<{ jogos: XboxTitle[] }>(`/xbox/profile/achievements/${user.xboxId}`)
      .then((res) => {
        setTitles(res.data.jogos);
      
      })
      .catch((err) => {
        console.error('Erro ao carregar conquistas Xbox:', err);
        setError('Falha ao carregar títulos Xbox.');
      });
  }, [loading, user?.xboxId]);

  if (loading) return <div>Carregando perfil...</div>;
  if (!user?.xboxId)
    return (
      <div>
        Vincule seu XUID em configurações.
        <br />
        XUID atual: <code>{user?.xboxId ?? '–'}</code>
      </div>
    );
  if (error) return <div className="text-red-500">{error}</div>;
  if (titles.length === 0) return <div>Carregando conquistas Xbox...</div>;

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-6 p-4">
        {titles.map((t) => (
          <XboxGameCard key={t.titleId} title={t} xboxId={user.xboxId!} />
        ))}
      </div>
    </div>
  );
};

export default XboxComponent;
