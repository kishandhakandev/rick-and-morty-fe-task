import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import { fetchCharactersByIds, fetchEpisode } from '../api/rickAndMorty';

export default function EpisodeDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const episodeQuery = useQuery({
    queryKey: ['episode', id],
    queryFn: () => fetchEpisode(id),
    enabled: Number.isFinite(id),
  });

  const characterIds = (episodeQuery.data?.characters ?? []).map((u: string) =>
    Number(u.split('/').pop())
  );
  const charactersQuery = useQuery({
    queryKey: ['episode-characters', characterIds],
    queryFn: () => fetchCharactersByIds(characterIds),
    enabled: characterIds.length > 0,
  });

  return (
    <div className="container-desktop">
      <Link
        to={-1 as unknown as string}
        className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-neutral-50"
      >
        ← Back
      </Link>
      <div className="mt-4 rounded-lg border border-neutral-200 bg-white p-6">
        {episodeQuery.isLoading ? (
          <Loader />
        ) : episodeQuery.isError ? (
          <ErrorState message={(episodeQuery.error as Error)?.message} />
        ) : (
          <>
            <h1 className="text-2xl font-semibold">
              {episodeQuery.data!.name}
            </h1>
            <div className="text-neutral-600">{episodeQuery.data!.episode}</div>
            <h2 className="mt-6 mb-2 text-lg font-semibold">Characters</h2>
            {charactersQuery.isLoading ? (
              <Loader />
            ) : charactersQuery.isError ? (
              <ErrorState message={(charactersQuery.error as Error)?.message} />
            ) : (
              <ul className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {charactersQuery.data?.map((c) => (
                  <li key={c.id} className="truncate text-sm">
                    {c.name}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
