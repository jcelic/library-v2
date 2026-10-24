'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FieldError } from '@/components/ui/FieldError';
import { type SignUpInput, signUpSchema } from '@/lib/validations/signup';
import { signUp } from '@/app/(auth)/signup/actions';
import { Spinner } from '@/components/ui/Spinner';
import { getPasswordScore } from '@/lib/password-strength';

const STRENGTH_LEVELS = [
  { label: 'Weak', bar: 'bg-danger', text: 'text-danger' },
  { label: 'Weak', bar: 'bg-danger', text: 'text-danger' },
  { label: 'Fair', bar: 'bg-warn', text: 'text-warn' },
  { label: 'Good', bar: 'bg-ok', text: 'text-ok' },
  { label: 'Strong', bar: 'bg-ok', text: 'text-ok' },
];

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const [password, name, email] = useWatch({
    control,
    name: ['password', 'name', 'email'],
  });

  const score = password ? getPasswordScore(password, [name, email]) : null;

  const level = score !== null ? STRENGTH_LEVELS[score] : null;
  const filledBars = score !== null ? Math.max(score, 1) : 0;

  const onSubmit = async (values: SignUpInput) => {
    const result = await signUp(values);

    if (result?.errors.root) {
      setError('root', { message: result.errors.root[0] });
    }

    if (result?.errors.email) {
      setError('email', { message: result.errors.email[0] });
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label htmlFor="name" className="block font-bold text-ink-2">
          Full name
        </label>

        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted">
            <User className="size-5" aria-hidden="true" />
          </span>

          <input
            id="name"
            type="text"
            {...register('name')}
            autoComplete="name"
            placeholder="John Doe"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby="name-error"
            className={`h-12 w-full rounded-xl border bg-surface pr-4 pl-12 text-base text-ink placeholder:text-muted focus:outline-none ${errors.name ? 'border-danger' : 'border-line-2 focus:border-accent'}`}
          />
        </div>

        <FieldError message={errors.name?.message} id="name-error" />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block font-bold text-ink-2">
          Email
        </label>

        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted">
            <Mail className="size-5" aria-hidden="true" />
          </span>

          <input
            id="email"
            type="email"
            {...register('email')}
            autoComplete="email"
            placeholder="john@example.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby="email-error"
            className={`h-12 w-full rounded-xl border bg-surface pr-4 pl-12 text-base text-ink placeholder:text-muted focus:outline-none ${errors.email ? 'border-danger' : 'border-line-2 focus:border-accent'}`}
          />
        </div>

        <FieldError message={errors.email?.message} id="email-error" />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block font-bold text-ink-2">
          Password
        </label>

        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted">
            <Lock className="size-5" aria-hidden="true" />
          </span>

          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            autoComplete="new-password"
            placeholder="Create a password"
            aria-invalid={errors.password ? true : undefined}
            aria-describedby="password-error"
            className={`h-12 w-full rounded-xl border bg-surface px-12 text-base text-ink placeholder:text-muted focus:outline-none ${errors.password ? 'border-danger' : 'border-line-2 focus:border-accent'}`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-muted hover:text-ink"
          >
            {showPassword ? (
              <EyeOff className="size-5" aria-hidden="true" />
            ) : (
              <Eye className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <FieldError message={errors.password?.message} id="password-error" />

        {level && (
          <div className="flex items-center gap-1.5 pt-1">
            {Array.from({ length: 4 }).map((_, index) => (
              <span
                key={index}
                className={`h-1.5 flex-1 rounded-full ${index < filledBars ? level.bar : 'bg-surface-3'}`}
              />
            ))}

            <span className={`ml-2 text-xs font-extrabold ${level.text}`}>
              {level.label}
            </span>
          </div>
        )}

        <p className="text-xs text-muted">
          At least 8 characters. Avoid common words and patterns.
        </p>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="confirm-password"
          className="block font-bold text-ink-2"
        >
          Confirm password
        </label>

        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted">
            <Lock className="size-5" aria-hidden="true" />
          </span>

          <input
            id="confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
            autoComplete="new-password"
            placeholder="Repeat your password"
            aria-invalid={errors.confirmPassword ? true : undefined}
            aria-describedby="confirm-password-error"
            className={`h-12 w-full rounded-xl border bg-surface px-12 text-base text-ink placeholder:text-muted focus:outline-none ${errors.confirmPassword ? 'border-danger' : 'border-line-2 focus:border-accent'}`}
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-muted hover:text-ink"
          >
            {showConfirmPassword ? (
              <EyeOff className="size-5" aria-hidden="true" />
            ) : (
              <Eye className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <FieldError
          message={errors.confirmPassword?.message}
          id="confirm-password-error"
        />
      </div>

      {errors.root?.message && (
        <p
          role="alert"
          className="rounded-xl bg-danger-soft px-4 py-3 text-sm font-semibold text-danger"
        >
          {errors.root.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-base font-extrabold text-on-accent transition-colors enabled:hover:bg-accent-hover disabled:opacity-70"
      >
        {isSubmitting ? 'Creating account…' : 'Create account'}
        {isSubmitting && <Spinner />}
      </button>
    </form>
  );
};

export default SignUpForm;
