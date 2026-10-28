'use client';

import { Trash2 } from 'lucide-react';
import { useId, type ReactNode, type Ref } from 'react';
import { Spinner } from '@/components/ui/Spinner';

type ConfirmDialogProps = {
  ref?: Ref<HTMLDialogElement>;
  media?: ReactNode;
  title: string;
  description: ReactNode;
  confirmLabel: string;
  pendingLabel: string;
  isPending: boolean;
  onConfirm: () => void;
};

const ConfirmDialog = ({
  ref,
  media,
  title,
  description,
  confirmLabel,
  pendingLabel,
  isPending,
  onConfirm,
}: ConfirmDialogProps) => {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <dialog
      ref={ref}
      role="alertdialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        if (isPending) {
          event.preventDefault();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && !isPending) {
          event.currentTarget.close();
        }
      }}
      className="m-auto h-fit w-[calc(100%-2rem)] max-w-md rounded-2xl border border-line bg-surface text-center text-ink shadow-lg transition-[opacity,scale] duration-200 ease-out backdrop:bg-overlay backdrop:backdrop-blur-sm backdrop:transition-opacity backdrop:duration-200 starting:open:scale-95 starting:open:opacity-0 starting:open:backdrop:opacity-0"
    >
      <div className="p-6">
        <div className="flex justify-center">
          {media ?? (
            <div className="flex size-14 items-center justify-center rounded-full bg-danger-soft/50">
              <div className="flex size-11 items-center justify-center rounded-full bg-danger-soft text-danger">
                <Trash2 className="size-5.5" aria-hidden="true" />
              </div>
            </div>
          )}
        </div>

        <h2 id={titleId} className="mt-4 text-xl font-extrabold tracking-tight">
          {title}
        </h2>
        <p id={descriptionId} className="mt-1.5 text-sm leading-5 text-muted">
          {description}
        </p>

        <form method="dialog" className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="h-11 flex-1 rounded-xl border border-line-2 px-5 font-bold text-ink-2 transition-colors enabled:hover:bg-surface-2 enabled:hover:text-ink disabled:opacity-70"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-danger px-5 font-extrabold text-on-danger transition-[filter] enabled:hover:brightness-95 disabled:opacity-70"
          >
            {isPending ? pendingLabel : confirmLabel}
            {isPending && <Spinner />}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default ConfirmDialog;
