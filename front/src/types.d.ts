export interface IArtist {
  _id: string;
  name: string;
  image: string | null;
  info: string;
}

export interface IAlbum {
  _id: string;
  name: string;
  image: string | null;
  year: number;
  totalTracks: number;
}

export interface IAlbumsByArtist {
  artist: string;
  albums: IAlbum[];
}

export interface ITrack {
  _id: string;
  album: string;
  name: string;
  duration: string;
  numberInAlbum: number;
}

export interface ITracksByAlbum {
  title: string;
  artist: IArtist;
  tracks: ITrack[];
}