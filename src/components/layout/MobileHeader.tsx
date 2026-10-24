import Link from 'next/link';
import { LogoMark } from '@/components/ui/LogoMark';
import { requireUser } from '@/lib/auth/session';
import UserMenu from '@/components/layout/UserMenu';

const MobileHeader = async () => {
  const user = await requireUser();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-surface px-4 lg:hidden">
      <Link href="/" className="flex items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-on-accent">
          <LogoMark className="size-6" />
        </span>
        <span className="text-xl font-extrabold tracking-tight">Library</span>
      </Link>

      <UserMenu name={user.name} email={user.email} />
    </header>
  );
};

export default MobileHeader;
