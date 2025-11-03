import { useState, useEffect } from 'react';
import { DEFAULT_DEBOUNCE_MS } from '../constants';

type Props = {
  initial?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
};

export default function SearchBar({
  initial = '',
  onChange,
  placeholder,
  debounceMs = DEFAULT_DEBOUNCE_MS,
}: Props) {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    const id = setTimeout(() => onChange(value.trim()), debounceMs);
    return () => clearTimeout(id);
  }, [value, onChange, debounceMs]);

  return (
    <div className="relative" role="search">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder ?? 'Search'}
        aria-label={placeholder ?? 'Search'}
        className="w-full rounded-full border border-neutral-300 bg-white px-4 py-2 pr-10 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
        🔍
      </span>
    </div>
  );
}
