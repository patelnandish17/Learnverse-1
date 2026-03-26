import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { createClient } from '../lib/supabase/client';
import { AuthLayout } from '../components/auth/AuthLayout';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const supabase = createClient();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    if (!supabase || countdown > 0) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });
    setLoading(false);
    if (!error) {
      setCountdown(60);
    } else {
      setError(error.message);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !otp || otp.length < 6) return;

    setVerifying(true);
    setError(null);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'signup',
    });

    if (error) {
      setError(error.message);
      setVerifying(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[440px] p-8 rounded-xl bg-bg-surface border border-bg-border shadow-elevated text-center">
        <div className="w-16 h-16 rounded-full bg-accent-primary/10 flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-accent-primary" />
        </div>

        <h1 className="text-2xl font-display font-extrabold text-text-primary mb-2">Verify your email</h1>
        <p className="text-sm text-text-secondary mb-8">
          We sent a 6-digit verification code to <span className="font-bold text-text-primary">{email}</span>. 
          Enter the code below to activate your account.
        </p>

        <form onSubmit={handleVerify} className="space-y-6 mb-8">
          <div>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              className="w-full text-center text-3xl font-bold tracking-[0.5em] py-4 rounded-xl bg-bg-elevated border border-bg-border focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-all"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-xs text-accent-danger font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={otp.length < 6 || verifying}
            className="w-full py-3 rounded-xl bg-accent-primary hover:bg-accent-primary/90 text-white font-bold shadow-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {verifying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Verify Account
              </>
            )}
          </button>
        </form>

        <div className="space-y-4">
          <button
            onClick={handleResend}
            disabled={countdown > 0 || loading}
            className="w-full py-3 rounded-xl bg-bg-elevated hover:bg-bg-border text-text-primary font-bold border border-bg-border transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {countdown > 0 ? `Resend in ${countdown}s` : 'Resend verification code'}
          </button>

          <Link
            to="/signup"
            className="flex items-center justify-center gap-2 text-sm font-bold text-text-muted hover:text-text-primary transition-colors"
          >
            Wrong email? Go back
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
