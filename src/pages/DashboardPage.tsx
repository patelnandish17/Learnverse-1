import { motion } from 'motion/react';
import { BookOpen, Clock, Trophy, Flame, PlayCircle, ArrowRight, Star } from 'lucide-react';
import { MOCK_COURSES, ROADMAPS } from '../lib/constants';
import { CourseCard } from '../components/course/CourseCard';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const continueLearning = MOCK_COURSES.slice(0, 2);
  const recommended = MOCK_COURSES.slice(2, 5);

  const stats = [
    { label: 'Courses Enrolled', value: '12', icon: BookOpen, color: 'text-accent-primary' },
    { label: 'Hours Learned', value: '48.5', icon: Clock, color: 'text-accent-success' },
    { label: 'Courses Completed', value: '4', icon: Trophy, color: 'text-accent-warning' },
    { label: 'Current Streak', value: '5 days', icon: Flame, color: 'text-accent-danger' },
  ];

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Welcome Header */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-display font-extrabold text-text-primary mb-4 tracking-tight"
          >
            Good morning, <span className="gradient-text">Nandish</span> 👋
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary flex items-center gap-2 font-medium"
          >
            You're on a 5-day streak. Keep it up! <Flame className="w-5 h-5 text-accent-primary fill-current drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
          </motion.p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2rem] glass-dark border-white/5 hover:border-accent-primary/30 transition-all duration-500 group shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl bg-white/5 group-hover:bg-accent-primary group-hover:text-black transition-all duration-500 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-text-primary mb-1 tracking-tight">{stat.value}</div>
              <div className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-black">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Continue Learning */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary">Continue Learning</h2>
            <Link to="/my-learning" className="text-sm font-bold text-accent-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {continueLearning.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                completionPercent={Math.floor(Math.random() * 80) + 10} 
              />
            ))}
          </div>
        </section>

        {/* Recommended For You */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary">Recommended For You</h2>
            <Link to="/explore" className="text-sm font-bold text-accent-primary hover:underline">
              Explore more
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommended.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Featured Roadmaps */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary">Featured Roadmaps</h2>
            <Link to="/roadmaps" className="text-sm font-bold text-accent-primary hover:underline">
              All roadmaps
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ROADMAPS.slice(0, 2).map((roadmap) => (
              <div key={roadmap.id} className="p-8 rounded-[2rem] bg-white/5 border border-white/5 flex gap-6 hover:border-accent-primary/30 hover:shadow-xl transition-all duration-500 group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-accent-primary shrink-0 shadow-sm group-hover:bg-accent-primary group-hover:text-black transition-all duration-500">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                    {roadmap.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-6 line-clamp-2 font-medium">
                    {roadmap.description}
                  </p>
                  <Link to={`/roadmaps/${roadmap.slug}`} className="text-sm font-bold text-accent-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                    Resume Roadmap <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
