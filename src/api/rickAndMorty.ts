import type { RMCharacter, RMCharactersResponse, RMEpisode } from '../types/rm';
export type Character = RMCharacter;
export type Episode = RMEpisode;

const BASE = 'https://rickandmortyapi.com/api';

export type CharactersResponse = RMCharactersResponse;

export async function fetchCharacters(params: {
  page?: number;
  name?: string;
}): Promise<CharactersResponse> {
  const url = new URL(BASE + '/character');
  if (params.page) url.searchParams.set('page', String(params.page));
  if (params.name) url.searchParams.set('name', params.name);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch characters');
  return res.json();
}

export async function fetchCharacter(id: number): Promise<Character> {
  const res = await fetch(`${BASE}/character/${id}`);
  if (!res.ok) throw new Error('Failed to fetch character');
  return res.json();
}

export function extractEpisodeIds(episodeUrls: string[]): number[] {
  return episodeUrls.map((u) => Number(u.split('/').pop())).filter(Boolean);
}

export async function fetchEpisodesByIds(ids: number[]): Promise<Episode[]> {
  if (ids.length === 0) return [];
  const unique = Array.from(new Set(ids));
  const res = await fetch(`${BASE}/episode/${unique.join(',')}`);
  if (!res.ok) throw new Error('Failed to fetch episodes');
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}

export async function fetchEpisode(id: number): Promise<Episode> {
  const res = await fetch(`${BASE}/episode/${id}`);
  if (!res.ok) throw new Error('Failed to fetch episode');
  return res.json();
}

export async function fetchCharactersByIds(
  ids: number[]
): Promise<Character[]> {
  if (ids.length === 0) return [];
  const unique = Array.from(new Set(ids));
  const res = await fetch(`${BASE}/character/${unique.join(',')}`);
  if (!res.ok) throw new Error('Failed to fetch characters');
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}
