import express from "express";
import Track from "../models/Track";
import Album from "../models/Album";
import mongoose from "mongoose";
import {ObjectId} from "mongodb";
import auth, {IRequestWithUser} from "../middlewares/auth";
import permit from "../middlewares/permit";
import {ITrack} from "../types";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res) => {
  try {
    if(req.query.album) {
      const id = req.query.album as string;

      const album = await Album.findById(id).populate('artist');

      if(!album) {
        return res.status(404).send({error: 'Album not found'});
      }

      const tracks = await Track.find({album: id}).sort({numberInAlbum: 1});

      return res.send({
        title: album.name,
        artist: album.artist,
        tracks,
      });
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

tracksRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as IRequestWithUser).user;

    const trackData: ITrack = {
      album: req.body.album,
      name: req.body.name,
      duration: req.body.duration,
      numberInAlbum: req.body.numberInAlbum,
      trackUrl: !req.body.trackUrl || req.body.trackUrl.trim() === '' ? null : req.body.trackUrl,
      user: user._id,
    };

    const track = new Track(trackData);

    await track.save();

    return res.send(track);
  } catch (e) {
    if(e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

tracksRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);

    if (!track) {
      return res.status(404).send({error: 'track not found'});
    }

    await Track.findByIdAndDelete(req.params.id);

    return res.status(200).send({ message: 'Success' });
  } catch (e) {
    return res.sendStatus(500);
  }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);

    if (!track) {
      return res.status(404).send({error: 'album not found'});
    }

    track.isPublished = !track.isPublished;

    await track.save();

    return res.status(200).send(track);
  } catch (e) {
    return res.sendStatus(500);
  }
});


export default tracksRouter;