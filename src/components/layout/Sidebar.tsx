import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { LogoMark } from '@/components/ui/LogoMark';
import { requireUser } from '@/lib/auth/session';
import { logout } from '@/lib/auth/actions';
import NavLinks from '@/components/layout/NavLinks';

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  const first = parts[0].charAt(0);
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';

  return (first + last).toUpperCase();
};

const Sidebar = async () => {
  const user = await requireUser();

  return (
    <aside className="sticky top-0 hidden h-dvh w-62 shrink-0 flex-col gap-8 border-r border-line bg-surface px-4 pt-6 pb-4 lg:flex">
      <Link href="/" className="flex items-center gap-2.5 px-2">
        <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-on-accent">
          <LogoMark className="size-6" />
        </span>
        <span className="text-xl font-extrabold tracking-tight">Library</span>
      </Link>

      <NavLinks />

      <div className="mt-auto flex items-center gap-2.5 rounded-2xl bg-surface-2 p-2.5">
        <span className="flex size-9.5 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-on-accent">
          {getInitials(user.name)}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate font-bold text-ink">{user.name}</p>
          <p className="truncate text-xs text-muted">{user.email}</p>
        </div>

        <form action={logout}>
          <button
            type="submit"
            aria-label="Sign out"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl text-ink-2 transition-colors hover:bg-surface hover:text-ink"
          >
            <LogOut className="size-5" aria-hidden="true" />
          </button>
        </form>
      </div>
    </aside>
  );
};

export default Sidebar;
