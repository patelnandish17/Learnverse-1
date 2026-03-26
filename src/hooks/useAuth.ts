import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '../lib/supabase/client';
import { useAuthStore, UserProfile } from '../store/authStore';

export function useAuth() {
  const supabase = createClient();
  const navigate = useNavigate();
  const { user, profile, loading, setUser, setProfile, setLoading } = useAuthStore();

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const fetchProfile = async (userId: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setProfile(data as UserProfile);
      }
    };

    const initializeAuth = async () => {
      setLoading(true);
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
      if (currentUser) {
        await fetchProfile(currentUser.id);
      }
      setLoading(false);
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        await fetchProfile(currentUser.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, setUser, setProfile, setLoading]);

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    navigate('/login');
  };

  return { user, profile, loading, signOut, isConfigured: !!supabase };
}
