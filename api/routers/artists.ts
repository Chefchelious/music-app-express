import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import {IArtist} from "../types";
import auth, {IRequestWithUser} from "../middlewares/auth";

const artistsRouter = express.Router();

artistsRouter.get('/', async (_, res) => {
  try {
    const artists = await Artist.find();

    return res.send(artists);
  } catch {
    return res.sendStatus(500);
  }
});

artistsRouter.post('/', auth, imagesUpload.single('image') , async (req, res, next) => {
    try {
      const user = (req as IRequestWithUser).user;

      const artistData: IArtist = {
        name: req.body.name,
        image: req.file ? req.file.filename : null,
        info: req.body.info,
        user: user._id,
      };
      const artist = new Artist(artistData);
      await artist.save();

      return res.send(artist);
    } catch (e) {
      if(e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      next(e);
    }
});

export default artistsRouter;