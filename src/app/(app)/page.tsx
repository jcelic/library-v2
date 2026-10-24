import { requireUser } from '@/lib/auth/session';

const HomePage = async () => {
  await requireUser();

  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight">Library</h1>
    </div>
  );
};

export default HomePage;
