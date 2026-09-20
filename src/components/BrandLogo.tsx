import { UtensilsCrossed } from 'lucide-react';
import { cn } from '@/lib/utils';

type BrandLogoProps = {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showIcon?: boolean;
};

export function BrandLogo({
  className,
  iconClassName,
  textClassName,
  showIcon = true,
}: BrandLogoProps) {
  return (
    <span className={cn('flex items-center gap-2', className)}>
      {showIcon && (
        <div
          className={cn(
            'rounded-xl bg-primary flex items-center justify-center shrink-0',
            iconClassName ?? 'w-8 h-8'
          )}
        >
          <UtensilsCrossed className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
      <span className={cn('font-bold tracking-tight text-foreground', textClassName ?? 'text-lg')}>
        ElOlam <span className="text-primary">Meal</span>
      </span>
    </span>
  );
}
