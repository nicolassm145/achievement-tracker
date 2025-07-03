import React, { useState } from 'react';
import SystemLayout from '../../components/Layout/SystemLayout';
import avatar from '../../assets/avatar.png';
import { useAuth } from '../../contexts/AuthContext';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const SettingsPage: React.FC = () => {
  const { user, loading } = useAuth();
  const [steamId, setSteamId] = useState('');
  const [xboxId, setXboxId] = useState('');
  const [psnId, setPsnId] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setError(null);
    setSaving(true);

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(
        'http://localhost:8000/steam/save-steamid',
        {},
        {
          params: { vanity_url: steamId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data as { steamid: string };
      console.log('SteamID salvo no back:', data.steamid);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
          err.message ||
          'Ocorreu um erro ao salvar o SteamID'
      );
    } finally {
      setSaving(false);
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
            <div>
              <a href="/profile">
                <AdjustmentsHorizontalIcon className="ml-auto w-10 cursor-pointer" />
              </a>
            </div>
          </div>

          {/* Título */}
          <h2 className="mt-8 text-center text-2xl font-semibold">Settings</h2>
          <div className="divider my-4" />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="flex flex-col items-center space-y-6"
          >
            <div className="form-control w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
              <label className="label">
                <span className="label-text">Steam</span>
              </label>
              <input
                type="text"
                placeholder="Digite seu Steam UID"
                className="input input-bordered w-full"
                value={steamId}
                onChange={(e) => setSteamId(e.target.value)}
              />
            </div>

            <div className="form-control w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
              <label className="label">
                <span className="label-text">Xbox</span>
              </label>
              <input
                type="text"
                placeholder="Digite seu Xbox ID"
                className="input input-bordered w-full"
                value={xboxId}
                onChange={(e) => setXboxId(e.target.value)}
              />
            </div>

            <div className="form-control w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
              <label className="label">
                <span className="label-text">Playstation</span>
              </label>
              <input
                type="text"
                placeholder="Digite seu PSN ID"
                className="input input-bordered w-full"
                value={psnId}
                onChange={(e) => setPsnId(e.target.value)}
              />
            </div>

            <div className="flex w-full justify-end sm:w-3/4 md:w-1/2 lg:w-1/3">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? 'Salvando…' : 'Salvar alterações'}
              </button>
            </div>

            {/* Mensagem de Erro */}
            {error && <p className="mt-2 text-sm text-red-500">❌ {error}</p>}
          </form>
        </div>
      </div>
    </SystemLayout>
  );
};

export default SettingsPage;
