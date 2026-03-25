import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 text-xs font-bold uppercase transition-colors ${
          i18n.language === 'en' 
            ? 'text-lush border-b border-lush' 
            : 'text-volcanic/60 hover:text-lush'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('fr')}
        className={`px-3 py-1 text-xs font-bold uppercase transition-colors ${
          i18n.language === 'fr' 
            ? 'text-lush border-b border-lush' 
            : 'text-volcanic/60 hover:text-lush'
        }`}
      >
        FR
      </button>
    </div>
  );
}