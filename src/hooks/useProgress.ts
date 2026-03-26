import { useEffect, useState } from 'react';
import { createClient } from '../lib/supabase/client';
import { useAuthStore } from '../store/authStore';

export interface CourseProgress {
  id: string;
  user_id: string;
  course_id: string;
  completed_lessons: string[];
  completion_percent: number;
  last_accessed_at: string;
  is_completed: boolean;
  completed_at: string | null;
}

export function useProgress() {
  const supabase = createClient();
  const { user } = useAuthStore();
  const [progress, setProgress] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user || !supabase) {
        setProgress([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('course_progress')
        .select('*')
        .eq('user_id', user.id);

      if (!error && data) {
        setProgress(data as CourseProgress[]);
      }
      setLoading(false);
    };

    fetchProgress();
  }, [user, supabase]);

  const updateProgress = async (courseId: string, lessonId: string) => {
    if (!user || !supabase) return;

    const currentCourseProgress = progress.find((p) => p.course_id === courseId);
    const completedLessons = currentCourseProgress?.completed_lessons || [];
    
    if (completedLessons.includes(lessonId)) return;

    const newCompletedLessons = [...completedLessons, lessonId];
    // Mock calculation for completion percent (in a real app, this would depend on total lessons)
    const newCompletionPercent = Math.min(Math.floor((newCompletedLessons.length / 10) * 100), 100);

    const upsertData = {
      user_id: user.id,
      course_id: courseId,
      completed_lessons: newCompletedLessons,
      completion_percent: newCompletionPercent,
      last_accessed_at: new Date().toISOString(),
      is_completed: newCompletionPercent === 100,
      completed_at: newCompletionPercent === 100 ? new Date().toISOString() : null,
    };

    const { data, error } = await supabase
      .from('course_progress')
      .upsert(upsertData, { onConflict: 'user_id,course_id' })
      .select()
      .single();

    if (!error && data) {
      setProgress((prev) => {
        const index = prev.findIndex((p) => p.course_id === courseId);
        if (index >= 0) {
          const newProgress = [...prev];
          newProgress[index] = data as CourseProgress;
          return newProgress;
        }
        return [...prev, data as CourseProgress];
      });
    }
  };

  return {
    progress,
    loading,
    updateProgress,
    getCourseProgress: (courseId: string) => progress.find((p) => p.course_id === courseId),
    isConfigured: !!supabase,
  };
}
