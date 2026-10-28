import AddBookDialog from '@/components/books/AddBookDialog';
import BookGrid from '@/components/books/BookGrid';
import EmptyLibrary from '@/components/books/EmptyLibrary';
import { requireUser } from '@/lib/auth/session';
import { db } from '@/lib/db';

const HomePage = async () => {
  const user = await requireUser();
  const userId = user.id;

  const books = await db.book.findMany({
    where: { userId },
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
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">My books</h1>
          {hasBooks && (
            <p className="mt-1 text-muted">
              {books.length} {books.length === 1 ? 'book' : 'books'}
            </p>
          )}
        </div>
        {hasBooks && <AddBookDialog />}
      </div>

      {hasBooks ? <BookGrid books={books} /> : <EmptyLibrary />}
    </div>
  );
};

export default HomePage;
