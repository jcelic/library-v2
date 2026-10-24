'use client';

import { Plus, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import AddBookForm from '@/components/books/AddBookForm';

const AddBookDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [formKey, setFormKey] = useState(0);

  const openDialog = () => {
    dialogRef.current?.showModal();
    dialogRef.current?.querySelector<HTMLInputElement>('#book-title')?.focus();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleSuccess = () => {
    closeDialog();
    toast.success('Book added');
  };

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="flex h-11 items-center gap-2 rounded-xl bg-accent px-4 font-extrabold text-on-accent transition-colors hover:bg-accent-hover"
      >
        <Plus className="size-5" aria-hidden="true" />
        Add book
      </button>

      <dialog
        aria-labelledby="add-book-title"
        ref={dialogRef}
        onClose={() => setFormKey((key) => key + 1)}
        className="mt-auto mb-0 h-fit max-h-[90dvh] w-full max-w-none rounded-t-2xl border-t border-line bg-surface text-ink shadow-lg backdrop:bg-overlay backdrop:backdrop-blur-sm sm:m-auto sm:max-w-lg sm:rounded-2xl sm:border"
      >
        <div className="flex h-full max-h-[inherit] flex-col">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2
              id="add-book-title"
              className="text-xl font-extrabold tracking-tight"
            >
              Add book
            </h2>

            <button
              type="button"
              onClick={closeDialog}
              aria-label="Close"
              className="flex size-10 items-center justify-center rounded-xl text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <AddBookForm
            key={formKey}
            onSuccess={handleSuccess}
            onCancel={closeDialog}
          />
        </div>
      </dialog>
    </>
  );
};

export default AddBookDialog;
