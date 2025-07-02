import React from 'react';
import { useTranslation } from 'react-i18next';

const InfoComponent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="text-base-content">
      <div className="container mx-auto mt-10 px-4">
        <p className="mb-6 text-center text-base sm:text-lg">
          {t('infoProfile.msg')} 
        </p>

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="grid grid-cols-2 gap-x-24 gap-y-4 sm:grid-cols-3 lg:grid-cols-3">
            <div className="space-y-1 text-center">
              <div
                className="tooltip text-xs font-medium sm:text-sm"
                data-tip={t('infoProfile.tipsGame')}
              >
                {t('infoProfile.ownedGames')}
              </div>
              <div className="text-sm font-bold sm:text-lg">0</div>
            </div>

            <div className="space-y-1 text-center">
              <div
                className="tooltip text-xs font-medium sm:text-sm"
                data-tip={t('infoProfile.tipsCompleted')}
              >
                {t('infoProfile.completedGames')}
              </div>
              <div className="text-sm font-bold sm:text-lg">0</div>
            </div>

            <div className="space-y-1 text-center">
              <div
                className="tooltip text-xs font-medium sm:text-sm"
                data-tip={t('infoProfile.tipsPlaying')}
              >
                {t('infoProfile.playing')}
              </div>
              <div className="text-sm font-bold sm:text-lg">0</div>
            </div>

            <div className="space-y-1 text-center">
              <div
                className="tooltip text-xs font-medium sm:text-sm"
                data-tip={t('infoProfile.tipsTrophy')}
              >
                {t('infoProfile.trophies')}
              </div>
              <div className="text-sm font-bold sm:text-lg">0</div>
            </div>

            <div className="space-y-1 text-center">
              <div
                className="tooltip text-xs font-medium sm:text-sm"
                data-tip={t('infoProfile.tipsHours')}
              >
                {t('infoProfile.hoursPlayed')}
              </div>
              <div className="text-sm font-bold sm:text-lg">0</div>
            </div>

            <div className="space-y-1 text-center">
              <div
                className="tooltip text-xs font-medium sm:text-sm"
                data-tip={t('infoProfile.tipsAverage')}
              >
                {t('infoProfile.average')}
              </div>
              <div className="text-sm font-bold sm:text-lg">0</div>
            </div>
            
            <div className="col-span-full flex justify-center text-sm sm:text-base">
              <p>{t('infoProfile.profile')}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between">
            <div className="carousel carousel-center w-full space-x-2 px-1 py-2 sm:space-x-4 sm:px-4">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="carousel-item shrink-0">
                  <div
                    className={
                      'h-24 w-16 rounded-lg bg-gray-200 shadow-lg transition-transform hover:scale-105 sm:h-32 sm:w-24'
                    }
                  />
                </div>
              ))}
            </div>
            <p className="mt-2 text-center text-sm sm:text-base">
              {t('infoProfile.latestGames')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoComponent;
