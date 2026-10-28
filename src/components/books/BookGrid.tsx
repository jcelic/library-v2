import type { BookCardData } from '@/components/books/BookCard';
import BookCard from '@/components/books/BookCard';

type BookGridProps = {
  books: BookCardData[];
};

const BookGrid = ({ books }: BookGridProps) => {
  return (
    <ul className="mt-16 grid grid-cols-[repeat(auto-fill,min(100%,16.5rem))] justify-evenly gap-x-6 gap-y-28">
      {books.map((book) => (
        <li key={book.id}>
          <BookCard book={book} />
        </li>
      ))}
    </ul>
  );
};

export default BookGrid;
