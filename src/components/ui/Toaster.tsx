import { Check, TriangleAlert } from 'lucide-react';
import { Toaster as Sonner } from 'sonner';

export const Toaster = () => {
  return (
    <Sonner
      position="top-center"
      icons={{
        success: (
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-ok-soft text-ok">
            <Check className="size-4" strokeWidth={3} aria-hidden="true" />
          </span>
        ),
        error: (
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-danger-soft text-danger">
            <TriangleAlert className="size-4" aria-hidden="true" />
          </span>
        ),
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'inset-x-0 mx-auto flex w-fit! max-w-full max-[600px]:right-8! items-center gap-3 rounded-xl border border-line bg-surface py-2.5 pr-4 pl-2.5 font-sans text-sm text-ink shadow-lg',
          content: 'flex min-w-0 flex-col',
          title: 'font-bold',
          description: 'text-muted',
        },
      }}
    />
  );
};
