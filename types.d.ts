export interface IArtist {
  name: string;
  image: string | null;
  info: string;
}

export interface IAlbum {
  artist: string;
  name: string;
  year: string;
  image: string | null;
}

export interface ITrack {
  name: string;
  album: string;
  duration: string;
}