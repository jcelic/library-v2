'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isNavItemActive, NAV_ITEMS } from '@/lib/navigation';

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="flex">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = isNavItemActive(href, pathname);

          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex h-16 flex-col items-center justify-center gap-1 text-xs transition-colors ${
                  isActive
                    ? 'font-extrabold text-ink'
                    : 'font-semibold text-muted hover:text-ink'
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

export default MobileNav;
