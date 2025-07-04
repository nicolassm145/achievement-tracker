import { useTranslation } from 'react-i18next';
import HeaderComponent from '../../components/HeaderComponent';

const PrivacyPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <HeaderComponent />

      <div className="container mx-auto mt-10 mb-12 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="card bg-base-100 rounded-lg p-6">
          <h1 className="mb-6 text-center text-xl font-extrabold sm:text-2xl md:text-3xl">
            {t('privacy.title')}
          </h1>

          <p className="mb-4 text-sm leading-relaxed sm:text-base">
            {t('privacy.intro')}
          </p>

          <h2 className="mb-2 text-base font-bold sm:text-lg">
            {t('privacy.section1.title')}
          </h2>
          <ul className="mb-4 list-inside list-disc space-y-2 text-sm sm:text-base">
            {(
              t('privacy.section1.items', { returnObjects: true }) as string[]
            ).map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          
          <h2 className="mb-2 text-base font-bold sm:text-lg">
            {t('privacy.section2.title')}
          </h2>
          <ul className="mb-4 list-inside list-disc space-y-2 text-sm sm:text-base">
            {(
              t('privacy.section2.items', { returnObjects: true }) as string[]
            ).map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <p className="text-sm leading-relaxed sm:text-base">
            {t('privacy.contact')}
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;
