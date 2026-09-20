import { cn } from '@/lib/utils';
import type { MarketingLocale } from '@/lib/marketing-home-copy';

type LanguageToggleProps = {
  locale: MarketingLocale;
  onChange: (locale: MarketingLocale) => void;
  className?: string;
};

export function LanguageToggle({ locale, onChange, className }: LanguageToggleProps) {
  return (
    <div
      className={cn('inline-flex rounded-lg border border-border bg-muted/40 p-0.5 text-xs font-semibold', className)}
      role="group"
      aria-label={locale === 'pt' ? 'Idioma do site' : 'Site language'}
    >
      <button
        type="button"
        aria-pressed={locale === 'pt'}
        className={cn(
          'px-2.5 py-1 rounded-md transition-colors',
          locale === 'pt' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
        )}
        onClick={() => onChange('pt')}
      >
        PT
      </button>
      <button
        type="button"
        aria-pressed={locale === 'en'}
        className={cn(
          'px-2.5 py-1 rounded-md transition-colors',
          locale === 'en' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
        )}
        onClick={() => onChange('en')}
      >
        EN
      </button>
    </div>
  );
}
