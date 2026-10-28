'use client';

import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRef, useTransition } from 'react';
import { toast } from 'sonner';
import { deleteBook } from '@/app/(app)/books/actions';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

type DeleteBookButtonProps = {
  id: string;
  title: string;
  imageUrl: string | null;
};

const DeleteBookButton = ({ id, title, imageUrl }: DeleteBookButtonProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await deleteBook(id);

      dialogRef.current?.close();

      if (result.success) {
        toast.success('Book deleted');
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        aria-label="Delete book"
        onClick={openDialog}
        className="flex size-10.5 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-ink-2 transition-colors hover:bg-danger-soft hover:text-danger"
      >
        <Trash2 className="size-5" aria-hidden="true" />
      </button>

      <ConfirmDialog
        ref={dialogRef}
        media={
          imageUrl ? (
            <div className="relative aspect-2/3 w-20 overflow-hidden rounded-lg shadow-lg">
              <Image
                src={imageUrl}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          ) : null
        }
        title="Delete this book?"
        description={
          <>
            <strong className="font-bold text-ink">{title}</strong> will be
            permanently removed from your library.
          </>
        }
        confirmLabel="Delete"
        pendingLabel="Deleting…"
        isPending={isPending}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default DeleteBookButton;
