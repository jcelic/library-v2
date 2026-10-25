import { BookOpen, Check, Clock, Heart, Trash2 } from 'lucide-react';
import { BookStatus } from '@/generated/prisma/enums';
import type { Book } from '@/generated/prisma/client';
import Image from 'next/image';

type BookCardProps = {
  book: Pick<Book, 'title' | 'author' | 'imageUrl' | 'status' | 'favorite'>;
};

const BookCard = ({ book }: BookCardProps) => {
  const { title, author, imageUrl, status, favorite } = book;
  const isFinished = status === BookStatus.FINISHED;

  return (
    <article className="flex h-full w-full flex-col items-center rounded-[20px] border border-line bg-surface px-5 pb-5">
      <div className="relative -mt-12 aspect-2/3 w-32.5 shrink-0 overflow-hidden rounded-[10px] shadow-lg">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Cover of ${title}`}
            fill
            sizes="130px"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-surface-2 text-muted">
            <BookOpen className="size-10" aria-hidden="true" />
          </div>
        )}
      </div>

      <h2 className="mt-4 line-clamp-2 text-center text-lg leading-6 font-bold text-ink">
        {title}
      </h2>
      <p className="mt-0.5 line-clamp-2 text-center text-sm leading-5 text-muted">
        {author}
      </p>

      <div className="mt-auto flex w-full gap-2 pt-4">
        <button
          type="button"
          className={`flex h-10.5 flex-1 items-center justify-center gap-1.5 rounded-xl text-sm font-bold whitespace-nowrap transition hover:brightness-95 ${
            isFinished ? 'bg-ok-soft text-ok' : 'bg-warn-soft text-warn'
          }`}
        >
          {isFinished ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <Clock className="size-4" aria-hidden="true" />
          )}
          {isFinished ? 'Finished' : 'Not finished'}
        </button>

        <button
          type="button"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={favorite}
          className={`flex size-10.5 shrink-0 items-center justify-center rounded-xl transition-colors ${
            favorite
              ? 'bg-fav-soft text-fav'
              : 'bg-surface-2 text-ink-2 hover:text-ink'
          }`}
        >
          <Heart
            className="size-5"
            fill={favorite ? 'currentColor' : 'none'}
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          aria-label="Delete book"
          className="flex size-10.5 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-ink-2 transition-colors hover:bg-danger-soft hover:text-danger"
        >
          <Trash2 className="size-5" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
};

export default BookCard;
