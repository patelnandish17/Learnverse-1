import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Star, Users, Clock, Calendar, Globe, CheckCircle2, 
  PlayCircle, FileText, HelpCircle, Award, Share2, Heart,
  ExternalLink, ChevronRight
} from 'lucide-react';
import { MOCK_COURSES } from '../lib/constants';
import { formatDuration, formatPrice, cn } from '../lib/utils';
import { RatingStars } from '../components/shared/RatingStars';
import { ProviderBadge } from '../components/course/CourseProviderBadge';
import { CourseThumbnail } from '../components/course/CourseThumbnail';
import { useBookmarks } from '../hooks/useBookmarks';
import { useProgress } from '../hooks/useProgress';

export default function CourseDetailPage() {
  const { id } = useParams();
  const course = MOCK_COURSES.find(c => c.id === id) || MOCK_COURSES[0];
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { getCourseProgress } = useProgress();
  
  const progress = getCourseProgress(course.id);
  const bookmarked = isBookmarked(course.id);

  const tabs = ['Overview', 'Curriculum', 'Instructor', 'Reviews'];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-width-container px-4 md:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-text-muted mb-8">
          <Link to="/explore" className="hover:text-text-primary transition-colors">Explore</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-text-primary transition-colors">{course.category}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-primary">{course.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-text-primary mb-4 leading-tight">
              {course.title}
            </h1>
            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
              {course.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-8">
              <ProviderBadge provider={course.provider} />
              <RatingStars rating={course.rating} reviewCount={course.reviewCount} />
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Users className="w-4 h-4" />
                {course.enrollmentCount.toLocaleString()} students
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Calendar className="w-4 h-4" />
                Updated {course.lastUpdated}
              </div>
            </div>

            {/* Preview Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-bg-border mb-12 group">
              <CourseThumbnail
                src={course.thumbnail}
                alt={course.title}
                category={course.category}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black shadow-glow">
                  <PlayCircle className="w-8 h-8 fill-current" />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-bg-border mb-8">
              <div className="flex items-center gap-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={cn(
                      "pb-4 text-sm font-bold transition-all relative",
                      tab === 'Overview' 
                        ? "text-accent-primary" 
                        : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {tab}
                    {tab === 'Overview' && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-primary" 
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Overview Section */}
            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-text-primary mb-6">What you'll learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-2xl bg-bg-surface border border-bg-border">
                  {course.whatYouLearn.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                      <CheckCircle2 className="w-5 h-5 text-accent-success shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text-primary mb-6">Description</h2>
                <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed">
                  <p>{course.description}</p>
                  <p className="mt-4">
                    This course is designed for anyone looking to master {course.category} from the ground up. Whether you're a complete beginner or looking to sharpen your existing skills, this comprehensive guide covers everything you need to know.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text-primary mb-6">Prerequisites</h2>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  {course.prerequisites.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="w-full lg:w-96 shrink-0">
            <div className="sticky top-24 p-6 rounded-2xl bg-bg-surface border border-bg-border shadow-elevated">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-extrabold text-text-primary">
                    {formatPrice(course.price)}
                  </span>
                  {course.originalPrice && (
                    <span className="text-lg text-text-muted line-through">
                      {formatPrice(course.originalPrice)}
                    </span>
                  )}
                </div>
                {course.originalPrice && (
                  <div className="text-accent-success text-sm font-bold">
                    {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-8">
                <a
                  href={course.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-accent-primary hover:bg-accent-primary/90 text-white font-bold shadow-glow transition-all active:scale-95"
                >
                  View on {course.provider}
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button className="w-full py-4 rounded-xl bg-bg-elevated hover:bg-bg-border text-text-primary font-bold border border-bg-border transition-all">
                  Free Preview
                </button>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider">This course includes:</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <PlayCircle className="w-4 h-4" />
                    {formatDuration(course.duration)} on-demand video
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <FileText className="w-4 h-4" />
                    12 downloadable resources
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <Globe className="w-4 h-4" />
                    Full lifetime access
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <Award className="w-4 h-4" />
                    Certificate of completion
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-8 pt-8 border-t border-bg-border">
                <button className="flex-1 flex items-center justify-center gap-2 text-sm font-bold text-text-secondary hover:text-text-primary transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button 
                  onClick={() => toggleBookmark(course.id)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 text-sm font-bold transition-colors",
                    bookmarked ? "text-accent-primary" : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  <Heart className={cn("w-4 h-4", bookmarked && "fill-current")} />
                  {bookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
              </div>

              {progress && (
                <div className="mt-8 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                    <span className="text-text-secondary">Your Progress</span>
                    <span className="text-accent-success">{progress.completion_percent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-bg-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent-success transition-all duration-500" 
                      style={{ width: `${progress.completion_percent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
