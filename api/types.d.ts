import mongoose from "mongoose";

export interface IArtist {
  name: string;
  image: string | null;
  info: string;
}

export interface IAlbum {
  artist: string;
  name: string;
  year: number;
  image: string | null;
}

export interface ITrack {
  name: string;
  album: string;
  duration: string;
  numberInAlbum: number;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
}

export interface ITrackHistory {
  user: mongoose.Schema.Types.ObjectId;
  track: mongoose.Schema.Types.ObjectId;
  datetime: string;
}