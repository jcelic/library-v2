type FieldErrorProps = {
  message?: string;
  id: string;
};

export const FieldError = ({ message, id }: FieldErrorProps) => {
  if (!message) return null;

  return (
    <p id={id} className="text-sm font-semibold text-danger">
      {message}
    </p>
  );
};
