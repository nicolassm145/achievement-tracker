import { useTranslation } from 'react-i18next';

export function LanguageComponent() {
  const { i18n } = useTranslation();
  return (
    <li>
      <a onClick={() => i18n.changeLanguage('en')} className="text-sm">
        {i18n.language === 'en' ? <strong>🇺🇸 English</strong> : '🇺🇸 English'}
      </a>

      <a onClick={() => i18n.changeLanguage('pt')} className="text-sm">
        {i18n.language === 'pt' ? (
          <strong>🇧🇷 Português</strong>
        ) : (
          '🇧🇷 Português'
        )}
      </a>
    </li>
  );
}
