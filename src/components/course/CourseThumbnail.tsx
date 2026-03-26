import { useState } from 'react';
import { cn } from '../../lib/utils';

interface CourseThumbnailProps {
  src?: string;
  alt: string;
  category: string;
  className?: string;
  containerClassName?: string;
}

const CATEGORY_FALLBACKS: Record<string, string> = {
  'Development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=450',
  'Design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800&h=450',
  'Data Science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=450',
  'Business': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=450',
  'Marketing': 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=800&h=450',
  'Personal Development': 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=800&h=450',
};

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800&h=450';

export function CourseThumbnail({ src, alt, category, className, containerClassName }: CourseThumbnailProps) {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = CATEGORY_FALLBACKS[category] || DEFAULT_FALLBACK;
  const displaySrc = imageError ? fallbackImage : (src || fallbackImage);

  return (
    <div className={cn("overflow-hidden", containerClassName)}>
      <img
        src={displaySrc}
        alt={alt}
        onError={() => setImageError(true)}
        className={cn("w-full h-full object-cover", className)}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
