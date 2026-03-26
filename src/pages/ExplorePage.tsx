import { useState } from 'react';
import { Search, Filter, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { MOCK_COURSES, CATEGORIES, PROVIDERS } from '../lib/constants';
import { CourseCard } from '../components/course/CourseCard';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useBookmarks } from '../hooks/useBookmarks';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const filteredCourses = MOCK_COURSES.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-display font-extrabold text-text-primary mb-4 tracking-tight"
          >
            Explore <span className="gradient-text">Courses</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary font-medium"
          >
            Discover {MOCK_COURSES.length} courses from top platforms.
          </motion.p>
        </div>

        {/* Search & Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="relative flex-1"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search for courses, topics, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-dark rounded-2xl py-4 pl-12 pr-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/30 focus:border-accent-primary/50 transition-all duration-300 shadow-xl border-white/5"
            />
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={cn(
              "flex items-center gap-2 px-6 py-4 rounded-2xl border font-bold transition-all duration-300 shadow-xl",
              isFilterOpen 
                ? "bg-accent-primary border-accent-primary text-black" 
                : "glass-dark border-white/5 text-text-primary hover:bg-white/5"
            )}
          >
            <Filter className="w-5 h-5" />
            Filters
          </motion.button>

          <div className="relative">
            <select className="appearance-none glass-dark rounded-2xl py-4 pl-6 pr-12 text-text-primary font-bold focus:outline-none focus:ring-2 focus:ring-accent-primary/30 transition-all cursor-pointer shadow-xl border-white/5">
              <option>Relevance</option>
              <option>Rating: High to Low</option>
              <option>Newest First</option>
              <option>Price: Low to High</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory('All')}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border",
              selectedCategory === 'All'
                ? "bg-accent-primary border-accent-primary text-black shadow-[0_5px_15px_rgba(255,215,0,0.3)]"
                : "glass-dark border-white/5 text-text-secondary hover:text-text-primary hover:border-white/10"
            )}
          >
            All
          </motion.button>
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border",
                selectedCategory === cat
                  ? "bg-accent-primary border-accent-primary text-black shadow-[0_5px_15px_rgba(255,215,0,0.3)]"
                  : "glass-dark border-white/5 text-text-secondary hover:text-text-primary hover:border-white/10"
              )}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-8">
            <div>
              <h4 className="text-text-primary font-bold text-sm uppercase tracking-wider mb-4">Providers</h4>
              <div className="space-y-3">
                {PROVIDERS.map((p) => (
                  <label key={p.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-bg-border bg-bg-surface text-accent-primary focus:ring-accent-primary" />
                    <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{p.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-text-primary font-bold text-sm uppercase tracking-wider mb-4">Level</h4>
              <div className="space-y-3">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-bg-border bg-bg-surface text-accent-primary focus:ring-accent-primary" />
                    <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-text-primary font-bold text-sm uppercase tracking-wider mb-4">Price</h4>
              <div className="space-y-3">
                {['All', 'Free', 'Paid'].map((price) => (
                  <label key={price} className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="price" className="w-4 h-4 border-bg-border bg-bg-surface text-accent-primary focus:ring-accent-primary" />
                    <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{price}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Course Grid */}
          <div className="flex-1">
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    isBookmarked={isBookmarked(course.id)}
                    onBookmarkToggle={toggleBookmark}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-bg-surface flex items-center justify-center mb-6 border border-bg-border">
                  <Search className="w-10 h-10 text-text-muted" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">No courses found</h3>
                <p className="text-text-secondary max-w-xs">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="mt-6 text-accent-primary font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
