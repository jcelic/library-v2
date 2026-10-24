import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/Toaster';

const nunito = Nunito({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: {
    default: 'Library',
    template: '%s · Library',
  },
  description: 'Your personal library — books you own, love and want to read.',
};

const RootLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="bg-bg font-sans text-sm text-ink antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
