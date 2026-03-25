import { motion } from 'motion/react';
import { ArrowRight, Play, CheckCircle2, Users, Star, Globe, Zap, Search, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_COURSES, ROADMAPS } from '../lib/constants';
import { CourseCard } from '../components/course/CourseCard';
import { cn } from '../lib/utils';

export default function LandingPage() {
  const featuredCourses = MOCK_COURSES.slice(0, 6);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-hero z-0" />
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 z-0 opacity-[0.05]" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, #FFD700 1px, transparent 0)',
            backgroundSize: '40px 40px' 
          }} 
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tight text-text-primary mb-10 leading-[0.95]">
              Every course. <br />
              <span className="gradient-text">One platform.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-14 leading-relaxed font-medium"
          >
            Curated learning paths from Udemy, Coursera, YouTube and more — organized around your goals, not theirs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24"
          >
            <Link
              to="/signup"
              className="w-full sm:w-auto px-12 py-5 rounded-[2rem] bg-accent-primary hover:bg-accent-primary/90 text-black font-bold text-xl shadow-[0_0_40px_rgba(255,215,0,0.3)] transition-all duration-500 flex items-center justify-center gap-3 group active:scale-95"
            >
              Start Learning Free
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/explore"
              className="w-full sm:w-auto px-12 py-5 rounded-[2rem] glass-dark hover:bg-white/10 text-text-primary font-bold text-xl transition-all duration-500 active:scale-95"
            >
              Browse Courses
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/150?u=${i}`}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-bg-base"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <div className="flex items-center gap-0.5 text-accent-warning">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-medium text-text-primary">Join 10,000+ learners</span>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[5%] hidden xl:block opacity-30 z-0"
        >
          <div className="w-72 h-48 glass rounded-[3rem] shadow-elevated border-accent-primary/20" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 40, 0],
            rotate: [0, -8, 0],
            scale: [1, 0.95, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-[5%] hidden xl:block opacity-30 z-0"
        >
          <div className="w-80 h-56 glass rounded-[4rem] shadow-elevated border-accent-primary/20" />
        </motion.div>

        <motion.div
          animate={{ 
            x: [0, 20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-[15%] hidden lg:block opacity-10 z-0"
        >
          <div className="w-40 h-40 rounded-full bg-accent-primary blur-3xl" />
        </motion.div>
      </section>

      {/* Logos Section */}
      <section className="py-16 bg-white/5 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-text-muted text-xs font-black uppercase tracking-[0.3em] mb-12">
            Courses from the world's best platforms
          </p>
          <div className="flex items-center justify-center flex-wrap gap-10 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {['Udemy', 'Coursera', 'edX', 'YouTube', 'Khan Academy'].map((logo) => (
              <span key={logo} className="text-2xl md:text-3xl font-display font-black text-text-primary tracking-tighter">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: 'All Platforms, One Search',
                desc: 'Stop jumping between tabs. Search Udemy, Coursera, and YouTube in one unified interface.',
                icon: Search,
                color: 'text-accent-primary',
                bg: 'bg-accent-primary/10',
              },
              {
                title: 'Guided Learning Roadmaps',
                desc: 'Not sure what to learn next? Follow our expert-curated paths from beginner to pro.',
                icon: Map,
                color: 'text-accent-success',
                bg: 'bg-accent-success/10',
              },
              {
                title: 'Track Your Progress',
                desc: 'Keep all your certificates and learning streaks in one dashboard, regardless of the provider.',
                icon: Zap,
                color: 'text-accent-warning',
                bg: 'bg-accent-warning/10',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-accent-primary/30 hover:shadow-xl transition-all duration-500 group"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm", feature.bg, feature.color)}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-display font-bold text-text-primary mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmaps Preview */}
      <section className="py-32 bg-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-extrabold text-text-primary mb-6 tracking-tight">
              Not sure where to start? <br />
              <span className="gradient-text">Follow a roadmap.</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto font-medium">
              Expert-curated paths that take you from zero to job-ready in the most in-demand tech fields.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROADMAPS.map((roadmap, i) => (
              <motion.div
                key={roadmap.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group p-8 rounded-[2.5rem] bg-bg-elevated border border-white/5 hover:border-accent-primary/30 hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent-primary border border-white/5 shadow-sm group-hover:bg-accent-primary group-hover:text-black transition-all duration-500">
                    <Globe className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">
                    {roadmap.courseCount} Courses
                  </span>
                </div>
                <h4 className="text-xl font-display font-bold text-text-primary mb-3 group-hover:text-accent-primary transition-colors">
                  {roadmap.title}
                </h4>
                <p className="text-sm text-text-secondary mb-8 line-clamp-2 font-medium">
                  {roadmap.description}
                </p>
                <Link
                  to={`/roadmaps/${roadmap.slug}`}
                  className="flex items-center gap-2 text-sm font-bold text-accent-primary group-hover:gap-4 transition-all"
                >
                  View Roadmap
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Courses */}
      <section className="py-32 bg-bg-base">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-extrabold text-text-primary mb-6 tracking-tight">
                Trending <span className="gradient-text">This Week</span>
              </h2>
              <p className="text-lg text-text-secondary font-medium">
                The most popular courses across all platforms right now.
              </p>
            </div>
            <Link to="/explore" className="text-accent-primary font-bold hover:underline flex items-center gap-2 group">
              View all courses
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[3rem] overflow-hidden p-16 md:p-24 text-center gradient-accent shadow-2xl">
            <div className="absolute inset-0 bg-black/10 z-0" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-display font-extrabold text-white mb-8 tracking-tighter">
                Ready to start your <br /> learning journey?
              </h2>
              <p className="text-white/90 text-xl mb-12 max-w-2xl mx-auto font-medium">
                Join thousands of students who are mastering new skills every day with LearnVerse.
              </p>
              <Link
                to="/signup"
                className="inline-block px-14 py-5 rounded-[2rem] bg-white text-black font-black text-xl hover:bg-white/90 transition-all duration-500 shadow-2xl active:scale-95"
              >
                Sign Up for Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
