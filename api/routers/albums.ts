import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import Track from "../models/Track";
import Artist from "../models/Artist";
import auth, {IRequestWithUser} from "../middlewares/auth";
import permit from "../middlewares/permit";
import {IAlbum} from "../types";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {

  try {
    if(req.query.artist) {
      const id = req.query.artist as string;

      const artist = await Artist.findById(id);

      if (!artist) {
        return res.status(404).send({error: 'Artist not found'});
      }

      const albumsByArtist = await Album.find({artist: new ObjectId(id)}).sort({year: -1});

      const promises = albumsByArtist.map(async (album) => {
        const tracksByAlbum = await Track.find({album: album._id});

        return {
          _id: album._id,
          name: album.name,
          image: album.image,
          year: album.year,
          totalTracks: tracksByAlbum.length,
        };
      });

      const fullAlbum = await Promise.all(promises);

      return res.send({
        artist: artist.name,
        albums: fullAlbum,
      });
    }

    const albums = await Album.find();

    return res.send(albums);
  } catch {
    return res.sendStatus(500);
  }
});

albumsRouter.get('/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate('artist');

    if(!album) {
      return res.status(404).send({"error": "Not found"});
    }

    return  res.send(album);
  } catch {
    return res.sendStatus(500);
  }
});

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = (req as IRequestWithUser).user;
    const albumData: IAlbum = {
      artist: req.body.artist,
      name: req.body.name,
      year: req.body.year,
      image: req.file ? req.file.filename : null,
      user: user._id,
    };

    const album = new Album(albumData);
    await album.save();

   return res.send(album);
  } catch (e) {
    if(e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

albumsRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).send({error: 'album not found'});
    }

    const usageInTracks = await Track.findOne({ album: req.params.id });

    if (usageInTracks) {
      return res.status(403).send({ error: 'Deletion denied. There are tracks in this album!' });
    }

    await Album.findByIdAndDelete(req.params.id);

    return res.status(200).send({ message: 'Success' });
  } catch (e) {
    return res.sendStatus(500);
  }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).send({error: 'album not found'});
    }

    album.isPublished = !album.isPublished;

    await album.save();

    return res.status(200).send(album);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default albumsRouter;