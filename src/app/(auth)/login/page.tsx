import Link from 'next/link';
import type { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
};

const LoginPage = () => {
  return (
    <>
      <header className="mb-8 space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-[42px]">
          Welcome back
        </h1>

        <p className="text-base text-muted">
          Sign in to continue to your library.
        </p>
      </header>

      <LoginForm />

      <p className="mt-8 text-center text-sm text-muted">
        Don’t have an account?{' '}
        <Link
          href="/signup"
          className="font-bold text-accent-text hover:underline"
        >
          Create one
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
