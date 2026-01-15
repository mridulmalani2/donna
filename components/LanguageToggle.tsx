'use client';

import { useTranslation } from '@/lib/context/LanguageContext';
import { Language } from '@/lib/translations/translations';

export default function LanguageToggle() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`
          px-3 py-1.5 rounded-md text-sm font-medium transition-all
          ${language === 'en'
            ? 'bg-white text-navy shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
          }
        `}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('fr')}
        className={`
          px-3 py-1.5 rounded-md text-sm font-medium transition-all
          ${language === 'fr'
            ? 'bg-white text-navy shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
          }
        `}
      >
        FR
      </button>
    </div>
  );
}
