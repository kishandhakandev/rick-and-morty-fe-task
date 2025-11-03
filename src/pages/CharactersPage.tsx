import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '../components/SearchBar';
import CharacterCard from '../components/CharacterCard';
import ErrorState from '../components/ErrorState';
import { fetchCharacters } from '../api/rickAndMorty';
import CharacterDetail from '../components/CharacterDetail';
import Pagination from '../components/Pagination';
import { CharacterCardSkeleton } from '../components/Skeleton';

export default function CharactersPage() {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['characters', { page, name }],
    queryFn: () => fetchCharacters({ page, name }),
    placeholderData: (prev) => prev,
  });

  const params = useParams();
  const selectedId = params.id ? Number(params.id) : undefined;

  // Scroll to top when a character is selected to ensure details are visible
  useEffect(() => {
    if (selectedId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedId]);

  const characters = data?.results ?? [];
  const totalPages = data?.info.pages ?? 0;

  const onSearchChange = useCallback((val: string) => {
    setPage(1);
    setName(val);
  }, []);

  const header = useMemo(
    () => (
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="w-full max-w-xl">
          <SearchBar
            placeholder="Search characters by name"
            onChange={onSearchChange}
          />
        </div>
        {isFetching && (
          <span className="text-sm text-neutral-500">Refreshing…</span>
        )}
      </div>
    ),
    [isFetching, onSearchChange]
  );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[380px_1fr]">
      <section>
        {header}
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CharacterCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <ErrorState message={(error as Error)?.message} />
        ) : characters.length === 0 ? (
          <div className="text-neutral-500">No characters found.</div>
        ) : (
          <div className="flex flex-col gap-3">
            {characters.map((c) => (
              <CharacterCard key={c.id} character={c} />
            ))}
          </div>
        )}
        <div className="mt-4 flex items-center justify-center">
          <Pagination current={page} total={totalPages} onChange={setPage} />
        </div>
      </section>

      <section className="hidden rounded-lg border border-neutral-200 p-6 md:block">
        {selectedId ? (
          <CharacterDetail id={selectedId} />
        ) : (
          <div className="text-neutral-400">
            Select a character to see details →
          </div>
        )}
      </section>
    </div>
  );
}
