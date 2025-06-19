import { useTranslation } from 'react-i18next';
import AuthComponent from '../../../components/AuthComponent';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-[url('/loginBG.jpg')] bg-cover bg-center">
      <AuthComponent />
      {/* Container que ocupa o espaço restante e centraliza o card */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10">
        <form className="register-overlay flex w-full max-w-xs flex-col items-center rounded-lg p-8 shadow-md backdrop-blur-sm sm:max-w-md sm:p-10 md:max-w md:p-12">
          {/* Título da página de login */}
          <h1 className="mb-6 text-center text-2xl font-bold tracking-tight">
            {t('auth.login')}
          </h1>

          <div className="flex w-full flex-col items-center gap-2">
            {/* Campo de e-mail */}
            <label className="input flex w-full max-w-xs items-center gap-2">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </g>
              </svg>
              <input
                type="email"
                className="w-full bg-transparent focus:outline-none"
                placeholder={t('auth.email')}
                required
              />
            </label>

            {/* Campo de senha */}
            <label className="input flex w-full max-w-xs items-center gap-2">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                </g>
              </svg>
              <input
                type="password"
                className="w-full bg-transparent focus:outline-none"
                placeholder={t('auth.password')}
                required
              />
            </label>

            {/* Botão de login */}
            <button className="btn mt-6 w-1/2" type="submit">
              {t('auth.loginBtn')}
            </button>

            {/* Link para página de registro */}
            <p className="mt-4 justify-center px-2 text-center text-sm">
              {t('auth.noAccount')} <br />
              <a
                href="/register"
                className="text-primary hover:text-primary-focus underline"
              >
                {t('auth.createAccount')}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
