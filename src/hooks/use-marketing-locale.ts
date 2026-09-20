import { useCallback, useEffect, useState } from 'react';
import type { MarketingLocale } from '@/lib/marketing-home-copy';

const STORAGE_KEY = 'elolam-meal-marketing-locale';

function readStoredLocale(): MarketingLocale {
  if (typeof window === 'undefined') return 'pt';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'pt') return stored;
  return 'pt';
}

export function useMarketingLocale() {
  const [locale, setLocaleState] = useState<MarketingLocale>(readStoredLocale);

  const setLocale = useCallback((next: MarketingLocale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next === 'pt' ? 'pt' : 'en';
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt' : 'en';
  }, [locale]);

  return { locale, setLocale };
}
