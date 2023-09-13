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