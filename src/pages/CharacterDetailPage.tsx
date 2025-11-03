import { Link, useParams } from 'react-router-dom';
import CharacterDetail from '../components/CharacterDetail';

export default function CharacterDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[380px_1fr]">
      <div className="md:col-span-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-neutral-50"
        >
          ← Back
        </Link>
      </div>
      <section className="md:col-span-2">
        <CharacterDetail id={id} />
      </section>
    </div>
  );
}
