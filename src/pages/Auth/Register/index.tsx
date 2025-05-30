import HeaderComponent from '../../../components/HeaderComponent';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col bg-[url('/registerBG.png')] bg-cover bg-center">
      <HeaderComponent />
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="register-overlay flex w-full max-w-sm flex-col items-center rounded-lg p-6 shadow-md backdrop-blur-sm sm:max-w-md sm:p-8 md:max-w-lg md:p-10 lg:max-w-xl lg:p-12">
          <h1 className="mb-6 text-center text-2xl font-bold tracking-tight">
            {t('auth.register')}
          </h1>

          <div className="flex w-full flex-col items-center gap-2">
            <label className="input validator">
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
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="text"
                required
                placeholder={t('auth.username')}
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength={3}
                maxLength={30}
                title="Only letters, numbers or dash"
              />
            </label>
             {/* Dps fazer modal */}
            <p className="validator-hint hidden">
              Must be 3 to 30 characters containing only letters, numbers or
              dash
            </p>

            <label className="input validator">
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
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input type="email" placeholder={t('auth.email')} required />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>

            <label className="input validator">
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
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder={t('auth.password')}
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number <br />
              At least one lowercase letter <br />
              At least one uppercase letter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
