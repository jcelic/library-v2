import AddBookDialog from '@/components/books/AddBookDialog';
import BookCard from '@/components/books/BookCard';
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
      subtitle: true,
      author: true,
      favorite: true,
      imageUrl: true,
      status: true,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">My books</h1>
          <p className="mt-1 text-muted">
            {books.length} {books.length === 1 ? 'book' : 'books'}
          </p>
        </div>
        <AddBookDialog />
      </div>

      <ul className="mt-16 grid grid-cols-[repeat(auto-fill,min(100%,16.5rem))] justify-evenly gap-x-6 gap-y-28">
        {books.map((book) => (
          <li key={book.id}>
            <BookCard book={book} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
