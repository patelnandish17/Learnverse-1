import { cn } from '../../lib/utils';

interface PasswordStrengthProps {
  password?: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  if (!password) return null;

  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  const colors = [
    'bg-accent-danger',
    'bg-orange-500',
    'bg-accent-warning',
    'bg-accent-success',
  ];

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1 h-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "flex-1 rounded-full transition-colors duration-300",
              i < score ? colors[score - 1] : "bg-bg-border"
            )}
          />
        ))}
      </div>
      <p className={cn(
        "text-[10px] font-bold uppercase tracking-wider",
        score > 0 ? `text-${colors[score - 1].split('-')[1]}` : "text-text-muted"
      )}>
        {labels[score - 1] || 'Too Short'}
      </p>
    </div>
  );
}
