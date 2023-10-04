import mongoose, { HydratedDocument } from 'mongoose';
import Album from './Album';
import { ITrack } from '../types';

const TrackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  album: {
    type: mongoose.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => await Album.findById(value),
      message: 'Album does not exist!',
    },
  },
  duration: {
    type: String,
    required: true,
  },
  numberInAlbum: {
    type: Number,
    min: 1,
    required: true,
    validate: {
      validator: async function (this: HydratedDocument<ITrack>): Promise<boolean> {
        if (!this.isModified('numberInAlbum')) {
          return true;
        }
        const existNumberInAlbum = await Track.findOne({
          album: this.album,
          numberInAlbum: this.numberInAlbum,
        });

        return !existNumberInAlbum;
      },
      message: 'Track with the same number already exists in this album!!',
    },
  },
  trackUrl: {
    type: String,
    default: null,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Track = mongoose.model('Track', TrackSchema);

export default Track;
