import React, { useState } from 'react';
import SystemLayout from '../../components/Layout/SystemLayout';
import avatar from '../../assets/avatar.png';
import { useAuth } from '../../contexts/AuthContext';

const SettingsPage: React.FC = () => {
  const { user, loading } = useAuth();
  const [steamId, setSteamId] = useState('');
  const [xboxId, setXboxId] = useState('');
  const [psnId, setPsnId] = useState('');

  const handleSave = () => {
    // aqui você envia steamId, xboxId e psnId para seu back
    console.log({ steamId, xboxId, psnId });
  };

  if (loading) {
    return (
      <SystemLayout>
        <div className="flex items-center justify-center h-64">
          Carregando perfil...
        </div>
      </SystemLayout>
    );
  }

  return (
    <SystemLayout>
      {/* Banner */}
      <div className="relative -mt-20 h-54 w-full sm:h-64 md:h-96 lg:h-128">
        <img
          src="/profileBG.png"
          alt="Banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black-100/80 to-base-100" />
      </div>

      {/* Card */}
      <div className="relative mx-auto -mt-8 px-4 sm:px-8 md:px-16 lg:px-36">
        <div className="profile-card rounded-lg shadow-xl bg-base-100 p-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 md:items-start">
            <img
              alt="Avatar do usuário"
              src={avatar}
              className="border-base-100 -mt-20 h-32 w-32 rounded border-4 shadow-md"
            />

            <div>
              <h1 className="-ml-1 text-xl font-bold sm:-mt-16 sm:text-2xl md:text-3xl lg:-mt-15">
                {user?.username ?? 'Usuário'}
              </h1>
            </div>
          </div>

          {/* Título */}
          <h2 className="mt-8 text-2xl font-semibold text-center">Settings</h2>
          <div className="divider my-4" />

          {/* Formulário centralizado e responsivo */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="flex flex-col items-center space-y-6"
          >
            {/* Steam UID */}
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

            {/* Xbox ID */}
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

            {/* PSN ID */}
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

            {/* Botão */}
            <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 flex justify-end">
              <button type="submit" className="btn btn-primary">
                Salvar alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </SystemLayout>
  );
};

export default SettingsPage;
