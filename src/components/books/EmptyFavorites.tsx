import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const EmptyFavorites = () => {
  return (
    <div className="mx-auto mt-28 flex max-w-sm flex-col items-center text-center sm:mt-16">
      <svg
        viewBox="0 0 240 170"
        className="w-60"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          x="36"
          y="26"
          width="168"
          height="124"
          rx="12"
          className="fill-surface stroke-line-2"
          strokeWidth="2"
        />
        <rect x="36" y="84" width="168" height="5" className="fill-line-2" />

        <rect
          x="52"
          y="40"
          width="18"
          height="44"
          rx="3"
          className="fill-accent"
        />
        <rect
          x="73"
          y="46"
          width="14"
          height="38"
          rx="3"
          className="fill-surface-3"
        />

        <rect
          x="104"
          y="98"
          width="32"
          height="44"
          rx="6"
          fill="none"
          className="stroke-fav"
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        <path
          d="M120 128.6c-8.6-6.7-10.5-11.4-7.6-14.7 2.4-2.9 6.2-2.4 7.6.5 1.4-2.9 5.2-3.4 7.6-.5 2.9 3.3 1 8-7.6 14.7z"
          className="fill-fav"
        />

        <rect
          x="150"
          y="104"
          width="16"
          height="38"
          rx="3"
          className="fill-surface-3"
        />
      </svg>

      <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-ink">
        No favorites yet
      </h2>
      <p className="mt-2 text-base text-muted">
        Tap the heart on any book and it will show up here.
      </p>

      <Link
        href="/"
        className="mt-6 flex h-11 items-center gap-2 rounded-xl border border-line-2 px-4 font-bold text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
      >
        <ArrowLeft className="size-5" aria-hidden="true" />
        Go to My books
      </Link>
    </div>
  );
};

export default EmptyFavorites;
