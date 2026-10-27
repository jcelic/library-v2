'use client';

import { Check, Clock } from 'lucide-react';
import { useOptimistic, useTransition } from 'react';
import { toast } from 'sonner';
import { setStatus } from '@/app/(app)/books/actions';
import { BookStatus } from '@/generated/prisma/enums';

type StatusButtonProps = {
  id: string;
  status: BookStatus;
};

const StatusButton = ({ id, status }: StatusButtonProps) => {
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(status);
  const [, startTransition] = useTransition();

  const isFinished = optimisticStatus === BookStatus.FINISHED;

  const handleClick = () => {
    const nextStatus = isFinished
      ? BookStatus.NOT_FINISHED
      : BookStatus.FINISHED;

    startTransition(async () => {
      setOptimisticStatus(nextStatus);

      const result = await setStatus(id, nextStatus);

      if (!result.success) {
        toast.error(result.error);
      }
    });
  };

  return (
    <button
      type="button"
      aria-label={isFinished ? 'Mark as not finished' : 'Mark as finished'}
      onClick={handleClick}
      className={`flex h-10.5 flex-1 items-center justify-center gap-1.5 rounded-xl text-sm font-bold whitespace-nowrap transition-[background-color,filter] hover:brightness-95 ${
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
  );
};

export default StatusButton;
