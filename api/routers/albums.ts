import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import {IAlbum} from "../types";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
  try {
    if(req.query.artist) {
      const id = req.query.artist as string;

      const albumsByArtist = await Album.find({artist: new ObjectId(id)});

      return res.send(albumsByArtist);
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
    next(e);
  }
});

export default albumsRouter;