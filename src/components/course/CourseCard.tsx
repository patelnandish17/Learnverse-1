import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Clock, BarChart, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Course } from '../../types/course';
import { cn, formatDuration, formatPrice, truncate } from '../../lib/utils';
import { RatingStars } from '../shared/RatingStars';
import { ProviderLogo } from '../shared/ProviderLogo';

interface CourseCardProps {
  key?: string | number;
  course: Course;
  isBookmarked?: boolean;
  completionPercent?: number;
  onBookmarkToggle?: (id: string) => void;
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

export function CourseCard({ course, isBookmarked, completionPercent, onBookmarkToggle }: CourseCardProps) {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = CATEGORY_FALLBACKS[course.category] || DEFAULT_FALLBACK;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative flex flex-col glass-dark rounded-[2.5rem] overflow-hidden hover:border-accent-primary/40 hover:shadow-[0_20px_50px_rgba(255,215,0,0.15)] transition-all duration-700"
    >
      <Link to={`/course/${course.id}`} className="flex-1 flex flex-col">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={imageError ? fallbackImage : (course.thumbnail || fallbackImage)}
            alt={course.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />
          
          {/* Liquid Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Overlays */}
          <div className="absolute top-4 left-4">
            <ProviderLogo provider={course.provider} className="w-8 h-8 shadow-2xl" />
          </div>
          
          {/* Level Badge */}
          <div className="absolute bottom-4 left-4 px-4 py-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-black/5 text-[10px] font-black text-black uppercase tracking-[0.2em] shadow-sm">
            {course.level}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          <h3 className="text-lg font-display font-bold text-text-primary line-clamp-2 mb-2 group-hover:text-accent-primary transition-colors duration-300 tracking-tight leading-tight">
            {course.title}
          </h3>
          
          <p className="text-xs text-text-secondary mb-6 font-bold uppercase tracking-widest opacity-70">
            {course.instructor.name}
          </p>

          <div className="mt-auto">
            <RatingStars rating={course.rating} reviewCount={course.reviewCount} className="mb-6" />
            
            <div className="flex items-center gap-5 text-[11px] text-text-muted mb-6 font-black uppercase tracking-[0.15em]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent-primary" />
                {formatDuration(course.duration)}
              </div>
              <div className="flex items-center gap-2">
                <BarChart className="w-4 h-4 text-accent-primary" />
                {course.level}
              </div>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-white/5">
              <span className="text-xl font-black text-text-primary tracking-tighter">
                {formatPrice(course.price)}
              </span>
              
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 group-hover:bg-accent-primary group-hover:text-black text-text-primary text-xs font-black uppercase tracking-widest transition-all duration-500 shadow-sm">
                Details
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Bookmark Button (Outside Link) */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onBookmarkToggle?.(course.id);
        }}
        className={cn(
          "absolute top-3 right-3 p-2 rounded-2xl backdrop-blur-md bg-white/10 border border-white/10 hover:bg-white/20 transition-all duration-300 z-10 shadow-sm",
          isBookmarked ? "text-accent-primary" : "text-white"
        )}
        aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
      >
        <Heart className={cn("w-4.5 h-4.5", isBookmarked && "fill-current")} />
      </button>

      {/* Progress Bar */}
      {completionPercent !== undefined && completionPercent > 0 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-bg-border">
          <div 
            className="h-full bg-accent-success transition-all duration-500" 
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      )}
    </motion.div>
  );
}
