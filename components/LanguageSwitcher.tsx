'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  // Detect current locale from path prefix
  const locale = pathname.startsWith('/ru') ? 'ru' : 'en';

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;
    if (newLocale === 'ru') {
      router.push('/ru' + (pathname.startsWith('/en') ? pathname.slice(3) : pathname));
    } else {
      router.push(pathname.startsWith('/ru') ? pathname.slice(3) || '/' : pathname);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1 text-sm font-medium transition-colors rounded ${
          locale === 'en'
            ? 'bg-primary-blue text-white'
            : 'text-gray-300 hover:text-white'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange('ru')}
        className={`px-3 py-1 text-sm font-medium transition-colors rounded ${
          locale === 'ru'
            ? 'bg-primary-blue text-white'
            : 'text-gray-300 hover:text-white'
        }`}
        aria-label="Переключить на русский"
      >
        RU
      </button>
    </div>
  );
}
