import mongoose from "mongoose";
import Album from "./Album";

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
    required: true,
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
    type:  mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Track = mongoose.model('Track', TrackSchema);

export default Track;