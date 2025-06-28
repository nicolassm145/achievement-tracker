import { useTranslation } from 'react-i18next';

const FooterComponent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer bg-base-100 text-base-content flex flex-col items-center gap-8 p-8 sm:px-10 md:flex-row md:items-start md:justify-between md:px-36 lg:px-36">
      {/* 1) Logo + Texto */}
      <aside className="flex flex-col items-center md:items-start">
        <div className="flex flex-row items-center gap-2 md:flex-row md:items-start">
          <a
            href="/about"
            className="link link-hover text-base font-bold sm:text-lg"
          >
            {t('footer.about')}
          </a>
          <a
            href="/terms"
            className="link link-hover text-base font-bold sm:text-lg"
          >
            {t('footer.terms')}
          </a>
          <a
            href="/privacy"
            className="link link-hover text-base font-bold sm:text-lg"
          >
            {t('footer.privacy')}
          </a>
        </div>

        <div className="space-y-1 text-center md:text-left">
          <p>{t('footer.description')}</p>
          <p>Copyright © {new Date().getFullYear()} - {t('footer.copyright')}</p>
        </div>
      </aside>

      <nav className="flex flex-col items-center gap-4">
        <div className="flex space-x-4">         
          {/* Linkedin */}
          <a
            href="/about"
            aria-label="Linkedin"
            className="text-base-content fill-current"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              ></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
          {/* Github */}
          <a
            href="/about"
            aria-label="Github"
            className="text-base-content fill-current"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default FooterComponent;
