import express from "express";
import mongoose from "mongoose";
import TrackHistory from "../models/TrackHistory";
import auth, {IRequestWithUser} from "../middlewares/auth";
import Track from "../models/Track";
import Album from "../models/Album";
import Artist from "../models/Artist";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as IRequestWithUser).user;

    const trackHistory = new TrackHistory({
      user: user._id,
      track: req.body.track,
    });
    await trackHistory.save();

    return res.send(trackHistory);
  } catch (e) {
    if(e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

trackHistoryRouter.get('/', auth, async (req, res, next) => {
  try {
    const user = (req as IRequestWithUser).user;

    const tracksHistory = await TrackHistory.find({ user: user._id }).sort({datetime: -1});

    const promises = tracksHistory.map(async (t) => {
      const track = await Track.findById(t.track);

      if (!track) return;

      const album = await Album.findById(track.album);

      if (!album) return;

      const artist = await Artist.findById(album.artist);

      if (!artist) return;

      return {
        _id: t._id,
        track: track.name,
        artist: artist.name,
        datetime: t.datetime,
      };
    });

    const tracksByUser = await Promise.all(promises);

    return res.send(tracksByUser);
  } catch (e) {
    return next(e);
  }
});
export default trackHistoryRouter;