'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { createBook } from '@/app/(app)/books/actions';
import { FieldError } from '@/components/ui/FieldError';
import { Spinner } from '@/components/ui/Spinner';
import { BookStatus } from '@/generated/prisma/enums';
import { type BookInput, bookSchema } from '@/lib/validations/book';

type AddBookFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

const AddBookForm = ({ onSuccess, onCancel }: AddBookFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<BookInput>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      author: '',
      status: BookStatus.NOT_FINISHED,
    },
  });

  const onSubmit = async (data: BookInput) => {
    const result = await createBook(data);

    if (!result.success) {
      if (result.errors.root) {
        setError('root', { message: result.errors.root[0] });
      }

      if (result.errors.title) {
        setError('title', { message: result.errors.title[0] });
      }

      return;
    }

    onSuccess();
  };

  return (
    <form
      onSubmit={(event) => handleSubmit(onSubmit)(event)}
      className="flex min-h-0 flex-1 flex-col"
    >
      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        <div className="space-y-1.5">
          <label htmlFor="book-title" className="block font-bold text-ink-2">
            Title
          </label>
          <input
            id="book-title"
            type="text"
            {...register('title')}
            aria-invalid={errors.title ? true : undefined}
            aria-describedby="book-title-error"
            className={`h-11 w-full rounded-xl border bg-surface px-4 text-base text-ink placeholder:text-muted focus:outline-none ${errors.title ? 'border-danger' : 'border-line-2 focus:border-accent'}`}
          />
          <FieldError message={errors.title?.message} id="book-title-error" />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="book-subtitle" className="block font-bold text-ink-2">
            Subtitle{' '}
            <span className="font-semibold text-muted">(optional)</span>
          </label>
          <input
            id="book-subtitle"
            type="text"
            {...register('subtitle')}
            aria-invalid={errors.subtitle ? true : undefined}
            aria-describedby="book-subtitle-error"
            className={`h-11 w-full rounded-xl border bg-surface px-4 text-base text-ink placeholder:text-muted focus:outline-none ${errors.subtitle ? 'border-danger' : 'border-line-2 focus:border-accent'}`}
          />
          <FieldError
            message={errors.subtitle?.message}
            id="book-subtitle-error"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="book-author" className="block font-bold text-ink-2">
            Author
          </label>
          <input
            id="book-author"
            type="text"
            {...register('author')}
            aria-invalid={errors.author ? true : undefined}
            aria-describedby="book-author-error"
            className={`h-11 w-full rounded-xl border bg-surface px-4 text-base text-ink placeholder:text-muted focus:outline-none ${errors.author ? 'border-danger' : 'border-line-2 focus:border-accent'}`}
          />
          <FieldError message={errors.author?.message} id="book-author-error" />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="book-category" className="block font-bold text-ink-2">
            Category
          </label>
          <div className="relative">
            <select
              id="book-category"
              {...register('category')}
              aria-invalid={errors.category ? true : undefined}
              aria-describedby="book-category-error"
              className={`h-11 w-full appearance-none rounded-xl border bg-surface pr-12 pl-4 text-base text-ink focus:outline-none ${errors.category ? 'border-danger' : 'border-line-2 focus:border-accent'}`}
            >
              <option value="">Select a category</option>
              <option value="FICTION">Fiction</option>
              <option value="NONFICTION">Nonfiction</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
          </div>
          <FieldError
            message={errors.category?.message}
            id="book-category-error"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="book-image-url"
            className="block font-bold text-ink-2"
          >
            Cover image URL{' '}
            <span className="font-semibold text-muted">(optional)</span>
          </label>
          <input
            id="book-image-url"
            type="url"
            className="h-11 w-full rounded-xl border border-line-2 bg-surface px-4 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <fieldset>
          <legend className="mb-1.5 font-bold text-ink-2">Status</legend>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex h-11 cursor-pointer items-center justify-center rounded-xl border border-line-2 font-semibold text-ink-2 transition-colors has-checked:border-accent has-checked:bg-accent-soft has-checked:font-extrabold has-checked:text-ink has-focus-visible:outline-2 has-focus-visible:outline-accent">
              <input
                type="radio"
                value="NOT_FINISHED"
                {...register('status')}
                className="sr-only"
              />
              Not finished
            </label>

            <label className="flex h-11 cursor-pointer items-center justify-center rounded-xl border border-line-2 font-semibold text-ink-2 transition-colors has-checked:border-accent has-checked:bg-accent-soft has-checked:font-extrabold has-checked:text-ink has-focus-visible:outline-2 has-focus-visible:outline-accent">
              <input
                type="radio"
                value="FINISHED"
                {...register('status')}
                className="sr-only"
              />
              Finished
            </label>
          </div>
        </fieldset>

        {errors.root?.message && (
          <p
            role="alert"
            className="rounded-xl bg-danger-soft px-4 py-3 text-sm font-semibold text-danger"
          >
            {errors.root.message}
          </p>
        )}
      </div>

      <div className="flex gap-3 border-t border-line px-5 py-4 sm:justify-end sm:border-t-0 sm:pt-0">
        <button
          type="button"
          onClick={onCancel}
          className="h-11 flex-1 rounded-xl border border-line-2 px-5 font-bold text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink sm:flex-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-5 font-extrabold text-on-accent transition-colors enabled:hover:bg-accent-hover disabled:opacity-70 sm:flex-none"
        >
          {isSubmitting ? 'Adding…' : 'Add book'}
          {isSubmitting && <Spinner />}
        </button>
      </div>
    </form>
  );
};

export default AddBookForm;
