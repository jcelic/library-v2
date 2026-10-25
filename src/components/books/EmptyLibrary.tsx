import AddBookDialog from '@/components/books/AddBookDialog';

const EmptyLibrary = () => {
  return (
    <div className="mx-auto mt-28 flex max-w-sm flex-col items-center text-center sm:mt-16">
      <svg
        viewBox="0 0 240 170"
        className="w-60"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          x="36"
          y="26"
          width="168"
          height="124"
          rx="12"
          className="fill-surface stroke-line-2"
          strokeWidth="2"
        />
        <rect x="36" y="84" width="168" height="5" className="fill-line-2" />

        <rect
          x="52"
          y="40"
          width="18"
          height="44"
          rx="3"
          className="fill-accent"
        />
        <rect
          x="73"
          y="46"
          width="14"
          height="38"
          rx="3"
          className="fill-surface-3"
        />

        <rect
          x="104"
          y="98"
          width="32"
          height="44"
          rx="6"
          fill="none"
          className="stroke-accent"
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        <path
          d="M120 112v16M112 120h16"
          className="stroke-accent"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <rect
          x="150"
          y="104"
          width="16"
          height="38"
          rx="3"
          className="fill-surface-3"
        />
      </svg>

      <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-ink">
        Your library is empty
      </h2>
      <p className="mt-2 text-base text-muted">
        Add your first book to start tracking what you own, love and want to
        read.
      </p>

      <div className="mt-6">
        <AddBookDialog />
      </div>
    </div>
  );
};

export default EmptyLibrary;
