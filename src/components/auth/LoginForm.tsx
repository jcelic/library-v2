'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '@/app/(auth)/login/actions';
import { FieldError } from '@/components/ui/FieldError';
import { Spinner } from '@/components/ui/Spinner';
import { type LoginInput, loginSchema } from '@/lib/validations/login';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginInput) => {
    const result = await login(values);

    if (result?.error) {
      setError('root', { message: result.error });
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="password" className="font-bold text-ink-2">
            Password
          </label>

          <Link
            href="/forgot-password"
            className="text-sm font-bold text-accent-text hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted">
            <Lock className="size-5" aria-hidden="true" />
          </span>

          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            autoComplete="current-password"
            placeholder="Enter your password"
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
        {isSubmitting ? 'Signing in…' : 'Sign in'}
        {isSubmitting && <Spinner />}
      </button>
    </form>
  );
};

export default LoginForm;
