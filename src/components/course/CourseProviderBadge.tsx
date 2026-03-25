import { Provider } from '../../types/course';
import { cn } from '../../lib/utils';
import { PROVIDERS } from '../../lib/constants';

interface ProviderBadgeProps {
  provider: Provider;
  className?: string;
}

export function ProviderBadge({ provider, className }: ProviderBadgeProps) {
  const providerInfo = PROVIDERS.find((p) => p.id === provider);

  return (
    <div
      className={cn(
        'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white',
        className
      )}
      style={{ backgroundColor: providerInfo?.color }}
    >
      {providerInfo?.name}
    </div>
  );
}
