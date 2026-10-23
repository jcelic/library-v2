'use client';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const score = 3;
  return (
    <form className="space-y-5">
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
            name="name"
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            className="h-12 w-full rounded-xl border border-line-2 bg-surface pr-4 pl-12 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>
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
            name="email"
            type="email"
            autoComplete="email"
            placeholder="john@example.com"
            className="h-12 w-full rounded-xl border border-line-2 bg-surface pr-4 pl-12 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>
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
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Create a password"
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

        <div className="flex items-center gap-1.5 pt-1">
          {Array.from({ length: 4 }).map((_, index) => {
            return (
              <span
                key={index}
                className={`h-1.5 flex-1 rounded-full ${score > index ? 'bg-ok' : 'bg-surface-3'}`}
              />
            );
          })}

          <span className="ml-2 text-xs font-extrabold text-ok">Strong</span>
        </div>

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
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Repeat your password"
            className="h-12 w-full rounded-xl border border-line-2 bg-surface px-12 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none"
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
      </div>

      <button
        type="button"
        className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 text-base font-extrabold text-on-accent transition-colors hover:bg-accent-hover"
      >
        Create account
      </button>
    </form>
  );
};

export default SignUpForm;
