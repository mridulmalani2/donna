'use client';

import { useTranslation } from '@/lib/context/LanguageContext';
import { Language } from '@/lib/translations/translations';

export default function LanguageToggle() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-1 bg-donna-bg-secondary/50 rounded-lg p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`
          px-3 py-1.5 rounded-md font-heading text-sm font-medium transition-smooth
          ${language === 'en'
            ? 'bg-donna-cyan text-donna-bg-primary'
            : 'text-donna-text-tertiary hover:text-donna-text-primary'
          }
        `}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('fr')}
        className={`
          px-3 py-1.5 rounded-md font-heading text-sm font-medium transition-smooth
          ${language === 'fr'
            ? 'bg-donna-cyan text-donna-bg-primary'
            : 'text-donna-text-tertiary hover:text-donna-text-primary'
          }
        `}
      >
        FR
      </button>
    </div>
  );
}
