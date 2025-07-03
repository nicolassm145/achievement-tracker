import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import avatar from '../assets/avatar.png';
import ThemeComponent from './ThemeComponent';
import { useNavigate } from 'react-router-dom';
import SearchComponent from './SearchComponent';

const HeaderComponent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar bg-base-100/50 px-4 sm:px-10 lg:px-36">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-lg sm:text-3xl">
          <span className="font-righteous">NEXUS</span>
        </a>
      </div>

      <div className="flex items-center gap-10">
        <SearchComponent
          inline
          className="hidden md:block w-64"
        />

        <SearchComponent
          className="relative md:hidden"
        />

        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="btn btn-ghost btn-square avatar ">
            <div className="w-12 sm:w-11 rounded flex-shrink-0">
              <img alt={t('header.avatarAlt')} src={avatar} />
            </div>
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-48 p-2 shadow-lg sm:w-52">
            <li><a href="/profile" className="text-sm">{t('header.profile')}</a></li>
            <li><a href="/games" className="flex items-center gap-2 text-sm">{t('header.games')}</a></li>
            <li><a href="/settings" className="flex items-center gap-2 text-sm">{t('header.settings')}</a></li>
            <li>
              <details>
                <summary className="text-sm">{t('header.preferences')}</summary>
                <ul>
                  <li>
                    <button onClick={() => i18n.changeLanguage('en')} className="text-sm">
                      {i18n.language === 'en' ? <strong>🇺🇸 English</strong> : '🇺🇸 English'}
                    </button>
                    <button onClick={() => i18n.changeLanguage('pt')} className="text-sm">
                      {i18n.language === 'pt' ? <strong>🇧🇷 Português</strong> : '🇧🇷 Português'}
                    </button>
                  </li>
                  <li><ThemeComponent /></li>
                </ul>
              </details>
            </li>
            <li>
              <button onClick={handleLogout} className="w-full text-left text-sm">
                {t('header.logout')}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
