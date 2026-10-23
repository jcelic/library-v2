import SignUpForm from '@/components/auth/SignUpForm';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up',
};

const SignUpPage = () => {
  return (
    <>
      <header className="mb-8 space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-[42px]">
          Create your account
        </h1>

        <p className="text-base text-muted">
          Start building your personal library in a minute.
        </p>
      </header>

      <SignUpForm />

      <p className="mt-8 text-center text-sm text-muted">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-bold text-accent-text hover:underline"
        >
          Sign in
        </Link>
      </p>
    </>
  );
};

export default SignUpPage;
