import React from 'react';
import { useTranslation } from 'react-i18next';

const InfoComponent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="text-base-content">
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-12">
            <p className="text-center text-sm sm:text-lg">
              {t('infoProfile.msg')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoComponent;
