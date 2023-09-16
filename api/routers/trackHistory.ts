import express from "express";
import mongoose from "mongoose";
import TrackHistory from "../models/TrackHistory";
import auth, {IRequestWithUser} from "../middlewares/auth";

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

    const tracksByUser = await TrackHistory.find({ user: user._id })
      .populate({
        path: 'track',
        select: 'name',
        populate: {
          path: 'album',
          select: 'album',
          populate: {
            path: 'artist',
            select: 'name'
          },
        },
      });

    return res.send(tracksByUser);
  } catch (e) {
    return next(e);
  }
});
export default trackHistoryRouter;