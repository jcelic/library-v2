'use client';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-6">
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
            name="email"
            type="email"
            autoComplete="email"
            placeholder="john@example.com"
            className="h-12 w-full rounded-xl border border-line-2 bg-surface pr-4 pl-12 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>
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
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            className="h-12 w-full rounded-xl border border-line-2 bg-surface px-12 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none"
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
      </div>

      <button
        type="button"
        className="h-14 w-full rounded-xl bg-accent px-6 text-base font-extrabold text-on-accent transition-colors hover:bg-accent-hover"
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
