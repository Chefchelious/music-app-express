export interface IArtist {
  name: string;
  image: string | null;
  info: string;
}

export interface IAlbum {
  name: string;
  artist: string;
  year: string;
  image: string | null;
}

export interface ITrack {
  name: string;
  album: string;
  duration: string;
}