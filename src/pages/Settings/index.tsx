// src/pages/SettingsPage.tsx
import React, { useState } from 'react';
import SystemLayout from '../../components/Layout/SystemLayout';
import avatar from '../../assets/avatar.png';
import { useAuth } from '../../contexts/AuthContext';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import api from '../../services/api';

const SettingsPage: React.FC = () => {
  const { user, setUser, loading } = useAuth();
  const [steamId, setSteamId] = useState('');
  const [xboxId, setXboxId] = useState('');
  const [psnId, setPsnId] = useState('');
  const [savingSteam, setSavingSteam] = useState(false);
  const [savingXbox, setSavingXbox] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSaveSteam = async () => {
    setError(null);
    setMessage(null);
    setSavingSteam(true);
    try {
      const response = await api.post<{ steamid: string }>(
        '/steam/save-steamid',
        {},
        { params: { vanity_url: steamId } }
      );
      const { steamid } = response.data;
      setUser((prev) => (prev ? { ...prev, steamid } : prev));
      setMessage('SteamID vinculado com sucesso!');
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.detail || err.message || 'Erro ao salvar SteamID'
      );
    } finally {
      setSavingSteam(false);
    }
  };

  const handleSaveXbox = async () => {
    setError(null);
    setMessage(null);
    setSavingXbox(true);

    try {
      // 1) Busca XUID a partir do gamertag
      const {
        data: { xuid },
      } = await api.get<{ xuid: string }>(
        `/xbox/profile/xuid/${encodeURIComponent(xboxId)}`
      );

      // 2) Envia o XUID diretamente como parâmetro para a rota
      const {
        data: { xboxid },
      } = await api.post<{ xboxid: string }>(
        '/xbox/save-xboxid',
        {},
        { params: { xboxid: xuid } }
      );

      // 3) Atualiza contexto e feedback
      setUser((prev) => (prev ? { ...prev, xboxId: xboxid } : prev));
      setMessage('Xbox ID vinculado com sucesso!');
    } catch (err: any) {
      console.error(err.response?.data || err);
      setError(
        err.response?.data?.detail || err.message || 'Erro ao salvar Xbox ID'
      );
    } finally {
      setSavingXbox(false);
    }
  };

  if (loading) {
    return (
      <SystemLayout>
        <div className="flex h-64 items-center justify-center">
          Carregando perfil...
        </div>
      </SystemLayout>
    );
  }

  return (
    <SystemLayout>
      <div className="relative -mt-20 h-54 w-full sm:h-64 md:h-96 lg:h-128">
        <img
          src="/profileBG.png"
          alt="Banner"
          className="h-full w-full object-cover"
        />
        <div className="via-black-100/80 to-base-100 absolute inset-0 bg-gradient-to-b from-transparent" />
      </div>

      <div className="relative mx-auto -mt-8 px-4 sm:-mt-32 sm:px-8 md:-mt-36 lg:-mt-40 lg:px-36">
        <div className="profile-card bg-base-100 rounded-lg p-6 shadow-xl">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 md:items-start">
            <img
              alt="Avatar do usuário"
              src={avatar}
              className="border-base-100 -mt-20 h-32 w-32 rounded border-4 shadow-md"
            />

            <div className="flex-1">
              <h1 className="-ml-1 text-xl font-bold sm:-mt-16 sm:text-2xl md:text-3xl lg:-mt-15">
                {user?.username ?? 'Usuário'}
              </h1>
            </div>
            <a href="/profile">
              <AdjustmentsHorizontalIcon className="ml-auto w-10 cursor-pointer" />
            </a>
          </div>

          <h2 className="mt-8 text-center text-2xl font-semibold">
            Configurações
          </h2>
          <div className="divider my-4" />

          {/* Steam ID */}
          <div className="form-control mb-6 w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
            <label className="label">
              <span className="label-text">Steam Vanity URL</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Digite sua vanity URL"
                className="input input-bordered flex-1"
                value={steamId}
                onChange={(e) => setSteamId(e.target.value)}
              />
              <button
                className="btn btn-primary"
                onClick={handleSaveSteam}
                disabled={savingSteam}
              >
                {savingSteam ? 'Salvando…' : 'Salvar'}
              </button>
            </div>
          </div>

          {/* Xbox ID */}
          <div className="form-control mb-6 w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
            <label className="label">
              <span className="label-text">Xbox ID</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Digite seu Xbox ID"
                className="input input-bordered flex-1"
                value={xboxId}
                onChange={(e) => setXboxId(e.target.value)}
              />
              <button
                className="btn btn-success"
                onClick={handleSaveXbox}
                disabled={savingXbox}
              >
                {savingXbox ? 'Salvando…' : 'Salvar'}
              </button>
            </div>
          </div>

          {/* PSN ID (idem) */}
          <div className="form-control mb-6 w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
            <label className="label">
              <span className="label-text">PSN ID</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Digite seu PSN ID"
                className="input input-bordered flex-1"
                value={psnId}
                onChange={(e) => setPsnId(e.target.value)}
              />
              <button className="btn btn-info">Salvar</button>
            </div>
          </div>

          {error && <p className="mt-2 text-sm text-red-500">❌ {error}</p>}
          {message && (
            <p className="mt-2 text-sm text-green-500">✅ {message}</p>
          )}
        </div>
      </div>
    </SystemLayout>
  );
};

export default SettingsPage;
