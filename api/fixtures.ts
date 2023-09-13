import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";
import TrackHistory from "./models/TrackHistory";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('artists');
    await db.dropCollection('albums');
    await db.dropCollection('tracks');
    await db.dropCollection('users');
    await db.dropCollection('trackhistories');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [artist_50_cent, artist_50_pence] = await Artist.create({
    name: '50 центов',
    image: null,
    info: 'famous MF',
  }, {
    name: '50 пенсов',
    image: 'fixtures/50pence.jpg',
    info: 'less famous than 50 центов',
  });

  const [album_1, album_2, album_3, album_4] = await Album.create({
    name: 'bandana',
    artist: artist_50_cent._id,
    year: 2021,
    image: null,
  }, {
    name: 'gangsta',
    artist: artist_50_cent._id,
    year: 2022,
    image: null,
  }, {
    name: 'cheaper than 50 cent but also nice',
    artist: artist_50_pence._id,
    year: 2023,
    image: null,
  }, {
    name: 'Someday I will become more expensive',
    artist: artist_50_pence._id,
    year: 2024,
    image: 'fixtures/50pence.jpg',
  });

  const [track_1, track_2, track_3, track_4] = await Track.create({
    name: 'In da Club',
    album: album_2._id,
    duration: '3:20',
    numberInAlbum: 1,
  }, {
    name: 'Window Shopper',
    album: album_2._id,
    duration: '2:40',
    numberInAlbum: 3,
  }, {
    name: 'ima 50 pense',
    album: album_4._id,
    duration: '1:40',
    numberInAlbum: 1,
  }, {
    name: 'loot',
    album: album_1._id,
    duration: '2:30',
    numberInAlbum: 3,
  });

  const [user_1, user_2] = await User.create({
    username: 'Test 1',
    password: '123',
    token: 'd233b045-70c6-496c-a234-c38e944c41ac'
  }, {
    username: 'Test 2',
    password: 'admin',
    token: 'f7aa223d-1c0a-46fd-962a-4cadb74cd293'
  });

  await TrackHistory.create({
    user: user_2._id,
    track: track_1._id,
    datetime: '2023-09-06T13:51:19.010Z',
  }, {
    user: user_2._id,
    track: track_3._id,
    datetime: '2023-09-06T13:54:05.112Z',
  }, {
    user: user_2._id,
    track: track_2._id,
    datetime: '2023-09-06T14:27:27.716Z',
  }, {
    user: user_1._id,
    track: track_2._id,
    datetime: '2023-09-06T14:44:43.193Z',
  });

  await db.close();
};

run().catch(console.error);
