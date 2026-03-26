import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { loginSchema, LoginInput } from '../../lib/validations';
import { createClient } from '../../lib/supabase/client';
import { OAuthButtons } from './OAuthButtons';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export function LoginForm() {
  const supabase = createClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    if (!supabase) {
      setError('Supabase is not configured. Please check your environment variables.');
      return;
    }
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (signInError) {
      setError('Invalid email or password');
      return;
    }

    const redirectTo = searchParams.get('redirectTo') || '/dashboard';
    navigate(redirectTo);
  };

  const handleForgotPassword = async () => {
    if (!supabase) {
      setError('Supabase is not configured.');
      return;
    }
    // Simplified forgot password flow
    const email = prompt('Enter your email address:');
    if (!email) return;

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (resetError) {
      alert(resetError.message);
    } else {
      alert('Check your email for a reset link');
    }
  };

  if (!supabase) {
    return (
      <div className="w-full max-w-[440px] p-8 rounded-xl bg-bg-surface border border-bg-border shadow-elevated text-center">
        <h1 className="text-2xl font-display font-extrabold gradient-text mb-4">Configuration Required</h1>
        <p className="text-sm text-text-secondary mb-6">
          Supabase is not configured. Please add <code className="bg-bg-elevated px-1.5 py-0.5 rounded text-accent-primary">VITE_SUPABASE_URL</code> and <code className="bg-bg-elevated px-1.5 py-0.5 rounded text-accent-primary">VITE_SUPABASE_ANON_KEY</code> to your environment variables in the Settings menu.
        </p>
        <Link to="/" className="text-accent-primary font-bold hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[440px] p-8 rounded-xl bg-bg-surface border border-bg-border shadow-elevated">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-display font-extrabold gradient-text mb-2">Welcome Back</h1>
        <p className="text-sm text-text-secondary">Sign in to continue your learning journey</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 ml-1">
            Email Address
          </label>
          <input
            {...register('email')}
            type="email"
            autoComplete="email"
            autoFocus
            placeholder="you@email.com"
            className="w-full px-4 py-3 rounded-xl bg-bg-elevated border border-bg-border focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-all text-sm"
          />
          {errors.email && (
            <p className="mt-1 ml-1 text-[12px] text-accent-danger">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5 ml-1">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider">
              Password
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-[10px] font-bold text-accent-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-bg-elevated border border-bg-border focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-all text-sm pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 ml-1 text-[12px] text-accent-danger">{errors.password.message}</p>
          )}
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-accent-danger/10 border border-accent-danger/20 text-[12px] text-accent-danger">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl bg-accent-primary hover:bg-accent-primary/90 text-white font-bold shadow-glow transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="flex-1 h-px bg-bg-border" />
        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Or continue with</span>
        <div className="flex-1 h-px bg-bg-border" />
      </div>

      <OAuthButtons />

      <p className="mt-8 text-center text-sm text-text-secondary">
        Don't have an account?{' '}
        <Link to="/signup" className="text-accent-primary font-bold hover:underline">
          Create account
        </Link>
      </p>
    </div>
  );
}
