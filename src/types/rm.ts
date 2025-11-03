export interface RMInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface RMOriginOrLocationRef {
  name: string;
  url: string;
}

export interface RMCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: RMOriginOrLocationRef;
  location: RMOriginOrLocationRef;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface RMCharactersResponse {
  info: RMInfo;
  results: RMCharacter[];
}

export interface RMEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
