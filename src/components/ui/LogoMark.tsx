type LogoMarkProps = {
  className?: string;
};

export const LogoMark = ({ className = 'size-6' }: LogoMarkProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <g transform="translate(12 12.61) scale(1.15) translate(-12 -12)">
        <path d="M11.25 7C9.5 5.7 7 5 4 5Q3 5 3 6V16Q3 17 4 17C7 17 9.5 17.7 11.25 19Z" />
        <path d="M12.75 7C14.5 5.7 17 5 20 5Q21 5 21 6V16Q21 17 20 17C17 17 14.5 17.7 12.75 19Z" />
      </g>
    </svg>
  );
};
