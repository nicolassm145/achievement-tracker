import SystemLayout from '../../components/Layout/SystemLayout';
import defaultAvatar from '../../assets/avatar.png';
import { useAuth } from '../../contexts/AuthContext';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import SteamComponent from '../../components/Achievements/SteamComponent';
import XboxComponent from '../../components/Achievements/XboxComponent';
import PsnComponent from '../../components/Achievements/PsnComponent';

import React, { useState } from 'react';
import RareAchievementsComponent from '../../components/Achievements/RareAchievementsComponent';

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

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
        <div className="profile-card rounded-lg shadow-xl md:p-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 md:items-start">
            <img
              alt="Avatar do usuário"
              src={user?.avatarUrl ?? defaultAvatar}
              className="border-base-100 -mt-20 h-32 w-32 rounded border-4 shadow-md"
            />

            <div className="flex-1">
              <h1 className="-ml-1 text-xl font-bold sm:-mt-16 sm:text-2xl md:text-3xl lg:-mt-15">
                {user?.username ?? 'Usuário'}
              </h1>
            </div>
            <div>
              <a href="/settings">
                <AdjustmentsHorizontalIcon className="ml-auto w-10 cursor-pointer" />
              </a>
            </div>
          </div>

          <div className="mt-6 flex ">
            <div className="rounded md:basis-[80%] ">
              <div role="tablist" className="tabs tabs-lift">
                <button
                  role="tab"
                  onClick={() => setActiveTab('Steam')}
                  className={`tab ${activeTab === 'Steam' ? 'tab-active' : ''} `}
                >
                  Steam
                </button>
                <button
                  role="tab"
                  onClick={() => setActiveTab('Xbox')}
                  className={`tab ${activeTab === 'Xbox' ? 'tab-active bg-green-500' : ''}`}
                >
                  Xbox
                </button>
                <button
                  role="tab"
                  onClick={() => setActiveTab('Playstation')}
                  className={`tab ${activeTab === 'Playstation' ? 'tab-active' : ''}`}
                >
                  Playstation
                </button>
              </div>

              <div className=" rounded ">
                {activeTab === 'Steam' && <SteamComponent />}
                {activeTab === 'Xbox' && <XboxComponent />}
                {activeTab === 'Playstation' && <PsnComponent />}
              </div>
            </div>
            <div className=" hidden basis-[30%] rounded p-4 md:block">
              <RareAchievementsComponent />
            </div>
          </div>
        </div>
      </div>
    </SystemLayout>
  );
};

export default ProfilePage;
