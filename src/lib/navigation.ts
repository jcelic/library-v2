import { Bookmark, Heart, House, Library, Settings } from 'lucide-react';

export const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: House },
  { href: '/shelves', label: 'Shelves', icon: Library },
  { href: '/favorites', label: 'Favorites', icon: Heart },
  { href: '/wishlist', label: 'Wishlist', icon: Bookmark },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export const isNavItemActive = (href: string, pathname: string) => {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
};
