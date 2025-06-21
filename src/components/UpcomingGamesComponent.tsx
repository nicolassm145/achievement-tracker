import React from 'react';
import { useTranslation } from 'react-i18next';

interface Game {
  title: string;
  label: string;
}

const comingSoon: Game[] = Array.from({ length: 6 }, (_, i) => ({
  title: `Coming Game ${i + 1}`,
  label: `Date ${i + 1}`,
}));

const anticipated: Game[] = Array.from({ length: 6 }, (_, i) => ({
  title: `Anticipated Game ${i + 1}`,
  label: `Date ${i + 1}`,
}));


const UpcomingGamesComponent: React.FC = () => {
  const { t } = useTranslation();
  const renderList = (items: Game[]) => (
    <ul className="space-y-4">
      {items.map((g, i) => (
        <li key={i} className="flex items-center gap-3">
          <div className="h-16 w-12 flex-shrink-0 rounded-lg bg-gray-800" />
          <div>
            <p className="text-sm font-medium">{g.title}</p>
            <p className="text-xs">{g.label}</p>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-start md:gap-6">
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">{t('homePage.comingSoon')}</h2>
            <button className="btn btn-link btn-sm">{t('homePage.seeMore')}</button>
          </div>
          {renderList(comingSoon)}
        </div>

        <div className="divider lg:divider-horizontal"></div>

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="mb-4 text-lg font-bold">{t('homePage.mostAnticipated')}</h2>
            <button className="btn btn-link btn-sm">{t('homePage.seeMore')}</button>
          </div>

          {renderList(anticipated)}
        </div>
      </div>
    </section>
  );
};

export default UpcomingGamesComponent;
