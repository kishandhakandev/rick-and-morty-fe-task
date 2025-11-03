import { memo, useCallback, useMemo } from 'react';

type Props = {
  current: number;
  total: number;
  onChange: (page: number) => void;
};

function getPageItems(current: number, total: number): (number | string)[] {
  if (total <= 1) return [1];

  const items: (number | string)[] = [];
  const add = (v: number | string) => items.push(v);

  const first = 1;
  const last = total;

  add(first);

  if (current - 2 > first) add('...');

  for (let p = current - 1; p <= current + 1; p++) {
    if (p > first && p < last) add(p);
  }

  if (current + 2 < last) add('...');

  if (last !== first) add(last);

  const seen = new Set<string>();
  return items.filter((v) => {
    const key = String(v);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function Pagination({ current, total, onChange }: Props) {
  if (!total || total < 1) return null;

  const items = useMemo(() => getPageItems(current, total), [current, total]);

  const canPrev = useMemo(() => current > 1, [current]);
  const canNext = useMemo(() => current < total, [current, total]);

  const goPrev = useCallback(() => {
    if (!canPrev) return;
    onChange(current - 1);
  }, [canPrev, current, onChange]);

  const goNext = useCallback(() => {
    if (!canNext) return;
    onChange(current + 1);
  }, [canNext, current, onChange]);

  const onPageClick = useCallback((p: number) => () => onChange(p), [onChange]);

  return (
    <nav
      className="flex items-center gap-2"
      role="navigation"
      aria-label="Pagination"
    >
      <button
        onClick={goPrev}
        disabled={!canPrev}
        className="rounded-md border px-3 py-2 text-sm hover:bg-neutral-50 disabled:opacity-40 disabled:hover:bg-transparent"
        aria-label="Previous page"
      >
        Previous
      </button>
      <ul className="flex items-center gap-1">
        {items.map((it, idx) =>
          it === '...' ? (
            <li key={`e-${idx}`} className="px-2 text-neutral-500">
              ...
            </li>
          ) : (
            <li key={it as number}>
              <button
                onClick={onPageClick(it as number)}
                aria-current={it === current ? 'page' : undefined}
                className={`min-w-[2.25rem] rounded-md border px-3 py-2 text-sm ${
                  it === current
                    ? 'border-indigo-500 bg-indigo-50 font-medium text-indigo-700'
                    : 'hover:bg-neutral-50'
                }`}
              >
                {it}
              </button>
            </li>
          )
        )}
      </ul>
      <button
        onClick={goNext}
        disabled={!canNext}
        className="rounded-md border px-3 py-2 text-sm hover:bg-neutral-50 disabled:opacity-40 disabled:hover:bg-transparent"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}

export default memo(Pagination);
