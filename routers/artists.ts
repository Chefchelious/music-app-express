import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {IArtist} from "../types";

const artistsRouter = express.Router();

artistsRouter.get('/', async (_, res) => {
  try {
    const artists = await Artist.find();

    return res.send(artists);
  } catch {
    return res.sendStatus(500);
  }
});

artistsRouter.post('/', imagesUpload.single('image') , async (req, res) => { // нужно ли проверять исполнителя на уникальность? по findOne и закинуть тудым имя
    try {
      const artistData: IArtist = {
        name: req.body.name,
        image: req.file ? req.file.filename : null,
        info: req.body.info,
      };
      const artist = new Artist(artistData);
      await artist.save();

      return res.send(artist);
    } catch (e) {
      return res.status(400).send(e);
    }
});

export default artistsRouter;