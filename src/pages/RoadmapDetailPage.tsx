import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Map, ArrowRight, CheckCircle2, Circle, 
  Clock, BookOpen, ChevronRight, PlayCircle
} from 'lucide-react';
import { ROADMAPS, MOCK_COURSES } from '../lib/constants';
import { cn } from '../lib/utils';
import { CourseThumbnail } from '../components/course/CourseThumbnail';

export default function RoadmapDetailPage() {
  const { slug } = useParams();
  const roadmap = ROADMAPS.find(r => r.slug === slug) || ROADMAPS[0];

  const steps = [
    { 
      title: 'Fundamentals', 
      desc: 'Master the core concepts and building blocks.',
      courses: MOCK_COURSES.slice(0, 2)
    },
    { 
      title: 'Advanced Techniques', 
      desc: 'Deep dive into complex patterns and performance.',
      courses: MOCK_COURSES.slice(2, 4)
    },
    { 
      title: 'Real-world Projects', 
      desc: 'Apply your knowledge to build production-ready apps.',
      courses: MOCK_COURSES.slice(4, 6)
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8">
      <div className="max-width-container">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-text-muted mb-8">
          <Link to="/roadmaps" className="hover:text-text-primary transition-colors">Roadmaps</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-text-primary">{roadmap.title}</span>
        </nav>

        {/* Hero */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center border border-accent-primary/20">
              <Map className="w-6 h-6" />
            </div>
            <span className="px-3 py-1 rounded-full bg-bg-surface border border-bg-border text-xs font-bold text-text-muted uppercase tracking-widest">
              Roadmap
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-text-primary mb-6">
            {roadmap.title}
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl leading-relaxed">
            {roadmap.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-8 mt-10 pt-10 border-t border-bg-border">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-text-muted" />
              <div className="text-sm">
                <div className="text-text-muted uppercase text-[10px] font-bold tracking-widest">Duration</div>
                <div className="text-text-primary font-bold">{roadmap.duration}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-text-muted" />
              <div className="text-sm">
                <div className="text-text-muted uppercase text-[10px] font-bold tracking-widest">Courses</div>
                <div className="text-text-primary font-bold">{roadmap.courseCount} curated courses</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-text-muted" />
              <div className="text-sm">
                <div className="text-text-muted uppercase text-[10px] font-bold tracking-widest">Learners</div>
                <div className="text-text-primary font-bold">2,450+ following</div>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Steps */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-bg-border hidden md:block" />

          <div className="space-y-20">
            {steps.map((step, i) => (
              <div key={i} className="relative md:pl-20">
                {/* Step Indicator */}
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-bg-base border-4 border-bg-border flex items-center justify-center z-10 hidden md:flex">
                  <div className="w-3 h-3 rounded-full bg-accent-primary shadow-glow" />
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-text-primary mb-2 flex items-center gap-3">
                    <span className="md:hidden w-8 h-8 rounded-full bg-accent-primary/10 text-accent-primary flex items-center justify-center text-sm">
                      {i + 1}
                    </span>
                    {step.title}
                  </h2>
                  <p className="text-text-secondary">{step.desc}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {step.courses.map((course) => (
                    <Link 
                      key={course.id} 
                      to={`/course/${course.id}`}
                      className="group p-5 rounded-2xl bg-bg-surface border border-bg-border hover:border-accent-primary transition-all duration-300 flex gap-5"
                    >
                      <CourseThumbnail
                        src={course.thumbnail}
                        alt={course.title}
                        category={course.category}
                        containerClassName="w-32 h-20 rounded-lg shrink-0 border border-bg-border"
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-text-primary mb-1 group-hover:text-accent-primary transition-colors line-clamp-1">
                          {course.title}
                        </h4>
                        <p className="text-xs text-text-secondary mb-3">{course.instructor.name}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[10px] text-text-muted uppercase font-bold tracking-wider">
                            <PlayCircle className="w-3 h-3" />
                            {course.provider}
                          </div>
                          <ArrowRight className="w-4 h-4 text-accent-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-32 p-12 rounded-3xl bg-bg-surface border border-bg-border text-center">
          <h2 className="text-3xl font-display font-extrabold text-text-primary mb-6">
            Start your journey today
          </h2>
          <p className="text-text-secondary mb-10 max-w-xl mx-auto">
            Join the thousands of developers who have used this roadmap to land their dream jobs.
          </p>
          <button className="px-10 py-4 rounded-full bg-accent-primary text-white font-bold text-lg shadow-glow hover:bg-accent-primary/90 transition-all active:scale-95">
            Enroll in Roadmap
          </button>
        </div>
      </div>
    </div>
  );
}

import { Users } from 'lucide-react';
