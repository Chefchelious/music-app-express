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

  const [artist_50_cent, knownAim] = await Artist.create({
    name: '50 центов',
    image: 'fixtures/50cent.jpg',
    info: 'famous MF',
  }, {
    name: 'KnownAim',
    image: 'fixtures/KnownAim.jpg',
    info: 'less famous than 50 центов',
  });

  const [album_1, album_2, album_3, album_4] = await Album.create({
    name: 'bandana',
    artist: artist_50_cent._id,
    year: 2021,
    image: 'fixtures/bandana.jpeg',
  }, {
    name: 'get rich or die tryin',
    artist: artist_50_cent._id,
    year: 2022,
    image: 'fixtures/get-rich-album.jpg',
  }, {
    name: 'dogolya',
    artist: knownAim._id,
    year: 2023,
    image: 'fixtures/dogolya.jpg',
  }, {
    name: 'Someday I will become more expensive',
    artist: knownAim._id,
    year: 2024,
    image: 'fixtures/dima-shish.jpeg',
  });

  const [track_1, track_2, track_3] = await Track.create({
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
    name: 'P.I.M.P.',
    album: album_2._id,
    duration: '2:50',
    numberInAlbum: 2,
  }, {
    name: 'Poppin Them Thangs',
    album: album_2._id,
    duration: '3:00',
    numberInAlbum: 4,
  },{
    name: 'Like My Style',
    album: album_2._id,
    duration: '3:40',
    numberInAlbum: 5,
  }, {
    name: 'loot',
    album: album_1._id,
    duration: '2:30',
    numberInAlbum: 3,
  }, {
    name: '99 problems',
    album: album_1._id,
    duration: '2:25',
    numberInAlbum: 1,
  },{
    name: 'Million',
    album: album_1._id,
    duration: '2:40',
    numberInAlbum: 2,
  },{
    name: '5 nights crazy',
    album: album_1._id,
    duration: '2:18',
    numberInAlbum: 4,
  },{
    name: 'Ladidadida',
    album: album_1._id,
    duration: '1:58',
    numberInAlbum: 5,
  },{
    name: 'SUNSET',
    album: album_3._id,
    duration: '3:56',
    numberInAlbum: 1,
  },{
    name: 'Растет тариф',
    album: album_3._id,
    duration: '3:09',
    numberInAlbum: 2,
  },{
    name: 'Экспресс',
    album: album_3._id,
    duration: '3:12',
    numberInAlbum: 3,
  },{
    name: 'Space',
    album: album_3._id,
    duration: '3:54',
    numberInAlbum: 4,
  },{
    name: 'АЛИ',
    album: album_3._id,
    duration: '3:54',
    numberInAlbum: 5,
  },{
    name: 'Балуюсь',
    album: album_4._id,
    duration: '1:55',
    numberInAlbum: 1,
  },{
    name: 'Снег',
    album: album_4._id,
    duration: '2:59',
    numberInAlbum: 2,
  },{
    name: 'Мистика',
    album: album_4._id,
    duration: '1:28',
    numberInAlbum: 3,
  },{
    name: 'Стресс',
    album: album_4._id,
    duration: '3:03',
    numberInAlbum: 5,
  },{
    name: 'Эзотерик',
    album: album_4._id,
    duration: '3:11',
    numberInAlbum: 4,
  },);

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
