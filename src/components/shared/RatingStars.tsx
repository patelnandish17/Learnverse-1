import { Star, StarHalf } from 'lucide-react';
import { cn } from '../../lib/utils';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  className?: string;
  showCount?: boolean;
}

export function RatingStars({ rating, reviewCount, className, showCount = true }: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 fill-accent-warning text-accent-warning" />
        ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-accent-warning text-accent-warning" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-text-muted" />
        ))}
      </div>
      {showCount && (
        <span className="text-xs text-text-secondary ml-1">
          ({rating.toFixed(1)}) {reviewCount && reviewCount.toLocaleString()}
        </span>
      )}
    </div>
  );
}
