// src/pages/AboutPage.tsx
import { useTranslation } from 'react-i18next';
import HeaderComponent from '../../components/HeaderComponent';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <HeaderComponent />

      <div className="container mx-auto mt-20 mb-12 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="card bg-base-100 rounded-lg p-6 ">
          <h1 className="mb-6 text-center text-xl font-extrabold sm:text-2xl md:text-3xl">
            {t('about.title')}
          </h1>

          <p className="mb-4 text-sm leading-relaxed sm:text-base">
            {t('about.description01')}
          </p>
          <p className="mb-8 text-sm leading-relaxed sm:text-base">
            {t('about.description02')}
          </p>

      
          <ul className="mt-5 space-y-4">
            <li className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <span className="font-semibold">Nícolas de Souza Moreira:</span>
              <div className="flex space-x-2">
                <a
                  href="https://www.linkedin.com/in/nicolassm145/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/nicolassm145"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline"
                >
                  GitHub
                </a>
              </div>
            </li>
            <li className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <span className="font-semibold">Pedro Luiz Freitas Silva:</span>
              <div className="flex space-x-2">
                <a
                  href="https://www.linkedin.com/in/pedroluizfs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/IamPedrin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline"
                >
                  GitHub
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
