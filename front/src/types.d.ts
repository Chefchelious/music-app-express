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

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface IUser {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterResponse {
  user: IUser;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      message: string;
      name: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}