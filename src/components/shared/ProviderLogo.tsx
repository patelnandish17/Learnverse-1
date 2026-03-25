import { Provider } from '../../types/course';
import { cn } from '../../lib/utils';

interface ProviderLogoProps {
  provider: Provider;
  className?: string;
}

export function ProviderLogo({ provider, className }: ProviderLogoProps) {
  // In a real app, these would be SVG icons or high-quality logos
  const logos: Record<Provider, string> = {
    udemy: 'U',
    coursera: 'C',
    youtube: 'Y',
    edx: 'E',
  };

  const colors: Record<Provider, string> = {
    udemy: 'bg-[#A435F0]',
    coursera: 'bg-[#0056D2]',
    youtube: 'bg-[#FF0000]',
    edx: 'bg-[#02262B]',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-sm font-bold text-white text-[10px]',
        colors[provider],
        className
      )}
    >
      {logos[provider]}
    </div>
  );
}
