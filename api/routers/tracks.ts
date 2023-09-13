import express from "express";
import Track from "../models/Track";
import Album from "../models/Album";
import mongoose from "mongoose";
import {ObjectId} from "mongodb";
import {ITrack} from "../types";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res) => {
  try {
    if(req.query.album) {
      const id = req.query.album as string;
      const tracksByAlbums = await Track.find({album: new ObjectId(id)});

      return res.send(tracksByAlbums);
    }

    if(req.query.artist) {
      const artistId = req.query.artist as string;
      const albumsByArtist = await Album.find({artist: new ObjectId(artistId)});
      const albumsId = albumsByArtist.map(album => album._id);

      const tracksByArtist = await Track.find({album: { $in: albumsId}});

      return res.send(tracksByArtist);
    }

    const tracks = await Track.find();

    return res.send(tracks);
  } catch {
    return res.sendStatus(500);
  }
});

tracksRouter.post('/', async (req, res, next) => {
  try {

    const trackDataData: ITrack = {
      album: req.body.album,
      name: req.body.name,
      duration: req.body.duration,
      numberInAlbum: req.body.numberInAlbum,
    };

    const trackNumberExist = await Track.findOne(
      {album: trackDataData.album, numberInAlbum: trackDataData.numberInAlbum}
    );

    if (trackNumberExist) {
      return res.status(400).send({error: 'Track with the same number already exists in this album!'});
    }

    const track = new Track(trackDataData);

    await track.save();

    return res.send(track);
  } catch (e) {
    if(e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});


export default tracksRouter;