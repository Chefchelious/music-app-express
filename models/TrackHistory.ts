import mongoose from "mongoose";
import Track from "./Track";

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
  user: {
    type:  mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  track: {
    type:  mongoose.Types.ObjectId,
    ref: 'Track',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => await Track.findById(value),
      message: 'Track does not exist!',
    },
  },
  datetime: {
    type: String,
    required: true,
    default: () => new Date().toISOString(),
  },
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

export default TrackHistory;