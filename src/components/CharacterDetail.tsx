import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loader from './Loader';
import ErrorState from './ErrorState';
import { CharacterDetailSkeleton } from './Skeleton';
import {
  extractEpisodeIds,
  fetchCharacter,
  fetchEpisodesByIds,
} from '../api/rickAndMorty';

export default function CharacterDetail({ id }: { id: number }) {
  const characterQuery = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacter(id),
    enabled: Number.isFinite(id),
  });

  const episodeIds = extractEpisodeIds(characterQuery.data?.episode ?? []);
  const episodesQuery = useQuery({
    queryKey: ['episodes', episodeIds],
    queryFn: () => fetchEpisodesByIds(episodeIds),
    enabled: episodeIds.length > 0,
  });

  if (characterQuery.isLoading) return <CharacterDetailSkeleton />;
  if (characterQuery.isError)
    return <ErrorState message={(characterQuery.error as Error)?.message} />;

  const c = characterQuery.data;
  if (!c) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <img
          src={c.image}
          alt={c.name}
          className="h-28 w-28 rounded-md object-cover"
        />
        <div>
          <h1 className="text-2xl font-semibold">{c.name}</h1>
          <p className="text-neutral-600">
            {c.species} • {c.status}
          </p>
        </div>
      </div>
      <div className="rounded-lg border border-neutral-200 bg-white p-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-neutral-500">Gender</div>
          <div>{c.gender}</div>
          <div className="text-neutral-500">Origin</div>
          <div>{c.origin?.name}</div>
          <div className="text-neutral-500">Last seen</div>
          <div>{c.location?.name}</div>
        </div>
      </div>
      <section className="rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="mb-3 text-xl font-semibold">Episodes</h2>
        {episodesQuery.isLoading ? (
          <Loader />
        ) : episodesQuery.isError ? (
          <ErrorState message={(episodesQuery.error as Error)?.message} />
        ) : (
          <ul className="space-y-2">
            {episodesQuery.data?.map((e) => (
              <li
                key={e.id}
                className="border-b border-neutral-100 pb-2 last:border-b-0"
              >
                <Link
                  to={`/episode/${e.id}`}
                  className="font-medium hover:underline"
                >
                  {e.name}
                </Link>
                <div className="text-sm text-neutral-600">{e.episode}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
