import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  info: String,
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

const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;