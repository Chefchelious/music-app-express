import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import {IAlbum} from "../types";
import Track from "../models/Track";
import Artist from "../models/Artist";

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

      // учесть что у артиста может и не быть альбомов, albumsByArtist проверить на length и вернуть просто пустой массив
      // для albums

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

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const albumData: IAlbum = {
      artist: req.body.artist,
      name: req.body.name,
      year: req.body.year,
      image: req.file ? req.file.filename : null,
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

albumsRouter.get('/:id/tracks', async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id).populate('artist');

    if(!album) {
      return res.status(404).send({error: 'Album not found'});
    }

    const tracks = await Track.find({album: req.params.id}).sort({numberInAlbum: 1});

    return res.send({
      title: album.name,
      artist: album.artist,
      tracks,
    });

  } catch (e) {
    return next(e);
  }
});

export default albumsRouter;