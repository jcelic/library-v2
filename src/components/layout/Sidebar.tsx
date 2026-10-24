import {
  Bookmark,
  Heart,
  House,
  Library,
  LogOut,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { LogoMark } from '@/components/ui/LogoMark';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: House },
  { href: '/shelves', label: 'Shelves', icon: Library },
  { href: '/wishlist', label: 'Wishlist', icon: Bookmark },
  { href: '/favorites', label: 'Favorites', icon: Heart },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="sticky top-0 hidden h-dvh w-62 shrink-0 flex-col gap-8 border-r border-line bg-surface px-4 pt-6 pb-4 lg:flex">
      <Link href="/" className="flex items-center gap-2.5 px-2">
        <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-on-accent">
          <LogoMark className="size-6" />
        </span>
        <span className="text-xl font-extrabold tracking-tight">Library</span>
      </Link>

      <nav aria-label="Main">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex h-11 items-center gap-3 rounded-xl px-3 font-semibold text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
              >
                <Icon className="size-5" aria-hidden="true" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto flex items-center gap-2.5 rounded-2xl bg-surface-2 p-2.5">
        <span className="flex size-9.5 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-on-accent">
          JD
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate font-bold text-ink">John Doe</p>
          <p className="truncate text-xs text-muted">john@example.com</p>
        </div>

        <button
          type="button"
          aria-label="Sign out"
          className="flex size-10 shrink-0 items-center justify-center rounded-xl text-ink-2 transition-colors hover:bg-surface hover:text-ink"
        >
          <LogOut className="size-5" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
