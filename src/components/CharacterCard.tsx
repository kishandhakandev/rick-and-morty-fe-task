import { Link } from 'react-router-dom';
import type { Character } from '../api/rickAndMorty';

type Props = { character: Character };

export default function CharacterCard({ character }: Props) {
  return (
    <Link
      to={`/character/${character.id}`}
      className="flex items-center gap-4 rounded-lg border border-neutral-200 bg-white p-3 shadow-sm hover:shadow-md"
    >
      <img
        src={character.image}
        alt={character.name}
        className="h-16 w-16 rounded-md object-cover"
      />
      <div className="min-w-0">
        <div className="truncate text-lg font-medium">{character.name}</div>
        <div className="text-sm text-neutral-600">
          {character.species} • {character.status}
        </div>
      </div>
    </Link>
  );
}
