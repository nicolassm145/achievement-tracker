// src/pages/SettingsPage.tsx
import React, { useState, useEffect } from 'react';
import SystemLayout from '../../components/Layout/SystemLayout';
import defaultAvatar from '../../assets/avatar.png';
import { useAuth } from '../../contexts/AuthContext';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import api from '../../services/api';
import { useTranslation } from 'react-i18next';

// importa todas as imagens de avatar com Vite
const avatarModules = import.meta.glob(
  '../../assets/avatars/*.{png,jpg,jpeg,svg}',
  { eager: true, import: 'default' }
);
const avatarImages = Object.values(avatarModules) as string[];

const AVATAR_CACHE_KEY = 'selectedAvatar';

const SettingsPage: React.FC = () => {
  const { user, setUser, loading } = useAuth();
  const { t } = useTranslation();
  // campos de ID (Steam/Xbox/PSN)...
  const [steamId, setSteamId] = useState('');
  const [xboxId, setXboxId] = useState('');
  const [psnId, setPsnId] = useState('');
  const [savingSteam, setSavingSteam] = useState(false);
  const [savingXbox, setSavingXbox] = useState(false);
  const [savingPsn, setSavingPsn] = useState(false);

  // avatar em front-only cache
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // feedback
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // ao montar, carrega valores do usuário e do cache
  useEffect(() => {
    if (user) {
      setSteamId(user.steamid ?? '');
      setXboxId(user.xboxId ?? '');
      setPsnId(user.psnId ?? '');
    }
    const cached = sessionStorage.getItem(AVATAR_CACHE_KEY);
    if (cached) {
      setSelectedAvatar(cached);
    }
  }, [user]);

  // salva avatar no sessionStorage e atualiza estado
  const handleConfirmAvatar = () => {
    if (!selectedAvatar) return;
    sessionStorage.setItem(AVATAR_CACHE_KEY, selectedAvatar);

    setMessage('Avatar set!');
    setShowAvatarModal(false);
  };

  // handlers de Steam/Xbox/PSN ...
  const handleSaveSteam = async () => {
    setError(null);
    setMessage(null);
    setSavingSteam(true);
    try {
      const resp = await api.post<{ steamid: string }>(
        '/steam/save-steamid',
        {},
        { params: { vanity_url: steamId } }
      );
      const { steamid } = resp.data;
      setUser((prev) => (prev ? { ...prev, steamid } : prev));
      setMessage('SteamID linked successfully!');
    } catch (err: any) {
      setError(
        err.response?.data?.detail || err.message || 'Error saving SteamID'
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
      const {
        data: { xuid },
      } = await api.get<{ xuid: string }>(
        `/xbox/profile/xuid/${encodeURIComponent(xboxId)}`
      );
      const {
        data: { xboxid },
      } = await api.post<{ xboxid: string }>(
        '/xbox/save-xboxid',
        {},
        { params: { xboxid: xuid } }
      );
      setUser((prev) => (prev ? { ...prev, xboxId: xboxid } : prev));
      setMessage('Xbox ID linked successfully!');
    } catch (err: any) {
      setError(
        err.response?.data?.detail || err.message || 'Error saving Xbox ID'
      );
    } finally {
      setSavingXbox(false);
    }
  };
  const handleSavePsn = async () => {
    setError(null);
    setMessage(null);
    setSavingPsn(true);
    try {
      const {
        data: { psnid },
      } = await api.post<{ psnid: string }>(
        '/psn/save-psnid',
        {},
        { params: { psnid: psnId } }
      );
      setUser((prev) => (prev ? { ...prev, psnId: psnid } : prev));
      setMessage('PSN ID linked successfully!');
    } catch (err: any) {
      setError(
        err.response?.data?.detail || err.message || 'Error saving PSN ID"'
      );
    } finally {
      setSavingPsn(false);
    }
  };

  if (loading) {
    return (
      <SystemLayout>
        <div className="flex h-64 items-center justify-center">
          Loading profile...
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
        <div className="via-black-100/80 to-base-100 absolute inset-0 bg-gradient-to-b from-transparent" />
      </div>

      {/* Card de configurações */}
      <div className="relative mx-auto -mt-8 px-4 sm:-mt-32 sm:px-8 md:-mt-36 lg:-mt-40 lg:px-36">
        <div className="profile-card bg-base-100 rounded-lg p-6 shadow-xl">
          {/* Avatar e botão */}
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 md:items-start">
            <img
              alt="Avatar do usuário"
              src={selectedAvatar ?? defaultAvatar}
              className="border-base-100 -mt-20 h-32 w-32 rounded border-4 object-cover shadow-md"
            />

            <div className="flex-1">
              <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
                {user?.username ?? 'Usuário'}
              </h1>
            </div>
            <button
              onClick={() => setShowAvatarModal(true)}
              className="btn btn-outline btn-sm mt-2 sm:mt-0"
            >
              {t('settings.avatar')}
            </button>
            <a href="/profile">
              <AdjustmentsHorizontalIcon className="w-10 cursor-pointer" />
            </a>
          </div>

          <h2 className="mt-8 text-center text-2xl font-semibold">
            {t('settings.title')}
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
                placeholder="Enter your Steam vanity URL"
                className="input input-bordered flex-1"
                value={steamId}
                onChange={(e) => setSteamId(e.target.value)}
              />
              <button
                className="btn btn-primary"
                onClick={handleSaveSteam}
                disabled={savingSteam}
              >
                {savingSteam ? 'Saving...' : 'Save'}
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
                placeholder="Enter your Xbox ID"
                className="input input-bordered flex-1"
                value={xboxId}
                onChange={(e) => setXboxId(e.target.value)}
              />
              <button
                className="btn btn-success"
                onClick={handleSaveXbox}
                disabled={savingXbox}
              >
                {savingXbox ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {/* PSN ID */}
          <div className="form-control mb-6 w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
            <label className="label">
              <span className="label-text">PSN ID</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter your PSN ID"
                className="input input-bordered flex-1"
                value={psnId}
                onChange={(e) => setPsnId(e.target.value)}
              />
              <button
                className="btn btn-info"
                onClick={handleSavePsn}
                disabled={savingPsn}
              >
                {savingPsn ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {/* Feedback */}
          {error && <p className="mt-2 text-sm text-red-500">❌ {error}</p>}
          {message && (
            <p className="mt-2 text-sm text-green-500">✅ {message}</p>
          )}
        </div>
      </div>

      {/* Modal de seleção de avatar */}
      {showAvatarModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-base">
          <div className="w-full max-w-lg rounded-lg border bg-base-200 p-6">
            <h3 className="mb-4 text-lg font-semibold ">{t('settings.selectAvatar')}</h3>
            <div className="grid max-h-80 grid-cols-4 gap-6 overflow-y-auto">
              {avatarImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Avatar ${idx}`}
                  className={`mt-2 ml-2 mb-2 mr-2 h-16 w-16 cursor-pointer rounded object-cover transition-transform ${
                    selectedAvatar === src ? 'ring-primary ring-4' : ''
                  }`}
                  onClick={() => setSelectedAvatar(src)}
                />
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button className="btn" onClick={() => setShowAvatarModal(false)}>
                {t('settings.cancel')}
              </button>
              <button
                className="btn btn-primary"
                onClick={handleConfirmAvatar}
                disabled={!selectedAvatar}
              >
                {t('settings.saveChanges')}
              </button>
            </div>
          </div>
        </div>
      )}
    </SystemLayout>
  );
};

export default SettingsPage;
