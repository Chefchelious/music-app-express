import mongoose from "mongoose";
import Artist from "./Artist";

const AlbumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => await Artist.findById(value),
      message: 'Artist does not exist!',
    },
  },
  year: {
    type: Number,
    required: true,
  },
  image: String,
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

const Album = mongoose.model('Album', AlbumSchema);
export default Album;