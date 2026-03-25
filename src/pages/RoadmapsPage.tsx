import { motion } from 'motion/react';
import { Map, ArrowRight, Clock, BookOpen, CheckCircle2 } from 'lucide-react';
import { ROADMAPS } from '../lib/constants';
import { Link } from 'react-router-dom';

export default function RoadmapsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8">
      <div className="max-width-container">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-extrabold text-text-primary mb-6"
          >
            Guided Learning <span className="gradient-text">Roadmaps</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            Don't waste time wondering what to learn next. Follow our structured paths to master the most in-demand skills in tech.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROADMAPS.map((roadmap, i) => (
            <motion.div
              key={roadmap.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-3xl bg-bg-surface border border-bg-border hover:border-accent-primary hover:shadow-glow transition-all duration-300 flex flex-col"
            >
              <div className="w-14 h-14 rounded-2xl bg-bg-elevated flex items-center justify-center text-accent-primary border border-bg-border mb-8 group-hover:scale-110 transition-transform">
                <Map className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-accent-primary transition-colors">
                {roadmap.title}
              </h3>
              
              <p className="text-text-secondary mb-8 leading-relaxed flex-1">
                {roadmap.description}
              </p>

              <div className="flex items-center gap-6 mb-8 pt-8 border-t border-bg-border">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Clock className="w-4 h-4" />
                  {roadmap.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <BookOpen className="w-4 h-4" />
                  {roadmap.courseCount} Courses
                </div>
              </div>

              <Link
                to={`/roadmaps/${roadmap.slug}`}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-bg-elevated hover:bg-accent-primary text-text-primary font-bold transition-all group-hover:shadow-glow"
              >
                View Roadmap
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* How it works */}
        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-extrabold text-text-primary mb-4">How it works</h2>
            <p className="text-text-secondary">Three simple steps to mastery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Pick a Path', desc: 'Choose a roadmap based on your career goals.' },
              { title: 'Learn in Order', desc: 'Follow the curated sequence of courses from top providers.' },
              { title: 'Track Progress', desc: 'Mark topics as complete and earn your way to mastery.' },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent-primary/10 text-accent-primary flex items-center justify-center font-bold text-xl mx-auto mb-6 border border-accent-primary/20">
                  {i + 1}
                </div>
                <h4 className="text-xl font-bold text-text-primary mb-3">{step.title}</h4>
                <p className="text-text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
