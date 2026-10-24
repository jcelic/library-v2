'use client';

import { isNavItemActive, NAV_ITEMS } from '@/lib/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Main">
      <ul className="space-y-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = isNavItemActive(href, pathname);

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex h-11 items-center gap-3 rounded-xl px-3 transition-colors ${
                  isActive
                    ? 'bg-accent-soft font-extrabold text-ink'
                    : 'font-semibold text-ink-2 hover:bg-surface-2 hover:text-ink'
                }`}
              >
                <Icon
                  className={`size-5 ${isActive ? 'text-accent' : ''}`}
                  aria-hidden="true"
                />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavLinks;
