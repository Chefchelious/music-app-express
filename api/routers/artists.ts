import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import auth, {IRequestWithUser} from "../middlewares/auth";
import permit from "../middlewares/permit";
import {IArtist} from "../types";
import Album from "../models/Album";

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

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).send({error: 'artist not found'});
    }

    const usageInAlbums = await Album.findOne({ artist: req.params.id });

    if (usageInAlbums) {
      return res.status(409).send({ error: 'Deletion denied. This artist has albums!' });
    }

    await Artist.findByIdAndDelete(req.params.id);

    return res.status(200).send({ message: 'Success' });
  } catch (e) {
    return res.sendStatus(500);
  }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).send({error: 'artist not found'});
    }

    artist.isPublished = !artist.isPublished;

    await artist.save();

    return res.status(200).send(artist);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default artistsRouter;