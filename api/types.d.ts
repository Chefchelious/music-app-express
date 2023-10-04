import mongoose from "mongoose";
import {ObjectId} from "mongodb";

export interface IArtist {
  name: string;
  image: string | null;
  info: string;
  user: ObjectId._id;
}

export interface IAlbum {
  artist: string;
  name: string;
  year: number;
  image: string | null;
  user: ObjectId._id;
}

export interface ITrack {
  name: string;
  album: string;
  duration: string;
  numberInAlbum: number;
  trackUrl: string | null;
  user: ObjectId._id;
}

export interface IUser {
  username: string;
  password: string;
  role: string;
  token: string;
  displayName: string;
  googleId?: string;
  avatar: string | null;
}

export interface ITrackHistory {
  user: mongoose.Schema.Types.ObjectId;
  track: mongoose.Schema.Types.ObjectId;
  datetime: string;
}