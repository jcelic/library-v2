import Sidebar from '@/components/layout/Sidebar';

const AppLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <div className="flex min-h-dvh">
      <Sidebar />

      <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">{children}</main>
    </div>
  );
};

export default AppLayout;
