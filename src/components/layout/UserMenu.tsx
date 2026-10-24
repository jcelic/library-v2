'use client';

import { LogOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { logout } from '@/lib/auth/actions';
import { getInitials } from '@/lib/format';

type UserMenuProps = {
  name: string;
  email: string;
};

const UserMenu = ({ name, email }: UserMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-label="Open user menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
        className="flex size-9 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-on-accent"
      >
        {getInitials(name)}
      </button>

      {menuOpen && (
        <div className="absolute top-full right-0 z-40 mt-2 w-64 rounded-2xl border border-line bg-surface p-2 shadow-lg">
          <div className="px-3 py-2">
            <p className="truncate font-bold text-ink">{name}</p>
            <p className="truncate text-xs text-muted">{email}</p>
          </div>

          <div className="my-1 h-px bg-line" />

          <form action={logout}>
            <button
              type="submit"
              className="flex h-11 w-full items-center gap-3 rounded-xl px-3 font-semibold text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <LogOut className="size-5" aria-hidden="true" />
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
