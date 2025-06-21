import React from 'react';
import { useTranslation } from 'react-i18next';

const TrendingGamesComponent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="items-center">
      <h2 className="mb-2 text-2xl font-bold">{t('homePage.trending')}</h2>
      <p className="mb-6 font-medium"> {t('homePage.trendingDescription')}</p>

      <div className="carousel carousel-center max-w-full space-x-4 p-2">
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className="carousel-item w-40">
            <div className="h-56 w-40 transform rounded-xl bg-gray-200 shadow-lg transition-transform duration-200 hover:scale-105" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingGamesComponent;
