import AddBookDialog from '@/components/books/AddBookDialog';
import { requireUser } from '@/lib/auth/session';

const HomePage = async () => {
  await requireUser();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Library</h1>
        <AddBookDialog />
      </div>
    </div>
  );
};

export default HomePage;
