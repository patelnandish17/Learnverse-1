import { createClient } from '../lib/supabase/client';
import { useAuthStore } from '../store/authStore';

export function useBookmarks() {
  const supabase = createClient();
  const { user, profile, setProfile } = useAuthStore();

  const toggleBookmark = async (courseId: string) => {
    if (!user || !profile || !supabase) return;

    const isBookmarked = profile.saved_courses.includes(courseId);
    const newBookmarks = isBookmarked
      ? profile.saved_courses.filter((id) => id !== courseId)
      : [...profile.saved_courses, courseId];

    // Optimistic update
    setProfile({ ...profile, saved_courses: newBookmarks });

    const { error } = await supabase
      .from('profiles')
      .update({ saved_courses: newBookmarks })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating bookmarks:', error.message);
      // Rollback on error
      setProfile(profile);
    }
  };

  return {
    bookmarks: profile?.saved_courses || [],
    toggleBookmark,
    isBookmarked: (courseId: string) => profile?.saved_courses.includes(courseId) || false,
    isConfigured: !!supabase,
  };
}
