import MobileHeader from '@/components/layout/MobileHeader';
import MobileNav from '@/components/layout/MobileNav';
import Sidebar from '@/components/layout/Sidebar';

const AppLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <div className="flex min-h-dvh">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <MobileHeader />

        <main className="flex-1 px-6 pt-8 pb-24 lg:px-10 lg:pb-8">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
};

export default AppLayout;
