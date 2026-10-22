import BookIllustration from '@/components/BookIllustration';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

const AuthLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr] bg-hero lg:grid-cols-[0.95fr_1.05fr] lg:grid-rows-1">
      <div className="flex min-w-0 flex-col overflow-hidden text-on-hero">
        <Link
          href="/"
          className="m-6 flex w-fit items-center gap-3 lg:mx-12 lg:mt-10"
        >
          <span className="flex size-12 items-center justify-center rounded-2xl bg-on-hero text-hero">
            <BookOpen className="size-6" aria-hidden="true" />
          </span>

          <span className="text-2xl font-extrabold tracking-tight">
            Library
          </span>
        </Link>

        <div className="mx-auto w-full max-w-180 px-4 pb-8 lg:flex lg:flex-1 lg:items-center lg:px-0 lg:py-10">
          <BookIllustration />
        </div>

        <div className="hidden space-y-6 px-12 pb-12 lg:block">
          <p className="max-w-xl text-[clamp(2.25rem,3.4vw,3.5rem)] leading-[1.06] font-extrabold tracking-tight">
            Every book you own,
            <br />
            love and want — on
            <br />
            one shelf.
          </p>

          <p className="max-w-lg text-lg leading-relaxed text-on-hero/80">
            Track what you’ve finished, organize custom shelves and keep a
            wishlist of what to read next.
          </p>

          <ul className="flex flex-wrap gap-3">
            {['Shelves', 'Wishlist', 'Favorites', 'Reading status'].map(
              (feature) => (
                <li
                  key={feature}
                  className="rounded-full border border-on-hero/70 px-4 py-2 text-sm font-bold"
                >
                  {feature}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <main className="relative -mt-20 flex items-start justify-center rounded-t-4xl bg-bg px-6 py-6 lg:mt-0 lg:items-center lg:rounded-none lg:px-12 lg:py-20">
        <div className="w-full max-w-110">{children}</div>
      </main>
    </div>
  );
};

export default AuthLayout;
