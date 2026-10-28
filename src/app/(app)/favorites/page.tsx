import type { Metadata } from 'next';
import BookGrid from '@/components/books/BookGrid';
import EmptyFavorites from '@/components/books/EmptyFavorites';
import { requireUser } from '@/lib/auth/session';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Favorites',
};

const FavoritesPage = async () => {
  const user = await requireUser();
  const userId = user.id;

  const books = await db.book.findMany({
    where: { userId, favorite: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      author: true,
      favorite: true,
      imageUrl: true,
      status: true,
    },
  });

  const hasBooks = books.length > 0;

  return (
    <div>
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">Favorites</h1>
        {hasBooks && (
          <p className="mt-1 text-muted">
            {books.length} {books.length === 1 ? 'book' : 'books'}
          </p>
        )}
      </div>

      {hasBooks ? <BookGrid books={books} /> : <EmptyFavorites />}
    </div>
  );
};

export default FavoritesPage;
