'use client';

import { Heart } from 'lucide-react';
import { useOptimistic, useTransition } from 'react';
import { toast } from 'sonner';
import { setFavorite } from '@/app/(app)/books/actions';

type FavoriteButtonProps = {
  id: string;
  favorite: boolean;
};

const FavoriteButton = ({ id, favorite }: FavoriteButtonProps) => {
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(favorite);
  const [, startTransition] = useTransition();

  const handleClick = () => {
    const nextFavorite = !optimisticFavorite;

    startTransition(async () => {
      setOptimisticFavorite(nextFavorite);

      const result = await setFavorite(id, nextFavorite);

      if (!result.success) {
        toast.error(result.error);
      }
    });
  };

  return (
    <button
      type="button"
      aria-label={
        optimisticFavorite ? 'Remove from favorites' : 'Add to favorites'
      }
      aria-pressed={optimisticFavorite}
      onClick={handleClick}
      className={`flex size-10.5 shrink-0 items-center justify-center rounded-xl transition-[background-color] ${
        optimisticFavorite
          ? 'bg-fav-soft text-fav'
          : 'bg-surface-2 text-ink-2 hover:text-ink'
      }`}
    >
      <Heart
        className="size-5"
        fill={optimisticFavorite ? 'currentColor' : 'none'}
        aria-hidden="true"
      />
    </button>
  );
};

export default FavoriteButton;
