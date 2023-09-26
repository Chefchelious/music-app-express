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

  const [user_1, user_2, user_3] = await User.create({
    username: 'Test 1',
    password: '123',
    token: 'd233b045-70c6-496c-a234-c38e944c41ac'
  }, {
    username: 'Test 2',
    password: 'admin',
    token: 'f7aa223d-1c0a-46fd-962a-4cadb74cd293'
  }, {
    username: 'Dim',
    password: '123',
    token: '9b0d45f7-2320-48a0-b802-119d4e92e1e2',
    role: 'admin',
  });

  const [artist_50_cent, knownAim] = await Artist.create({
    name: '50 центов',
    image: 'fixtures/50cent.jpg',
    info: 'famous MF',
    user: user_3._id,
  }, {
    name: 'KnownAim',
    image: 'fixtures/KnownAim.jpg',
    info: 'less famous than 50 центов',
    user: user_3._id,
  });

  const [album_1, album_2, album_3, album_4] = await Album.create({
    name: 'bandana',
    artist: artist_50_cent._id,
    year: 2021,
    image: 'fixtures/bandana.jpeg',
    user: user_3._id,
  }, {
    name: 'get rich or die tryin',
    artist: artist_50_cent._id,
    year: 2022,
    image: 'fixtures/get-rich-album.jpg',
    user: user_3._id,
  }, {
    name: 'dogolya',
    artist: knownAim._id,
    year: 2023,
    image: 'fixtures/dogolya.jpg',
    user: user_3._id,
  }, {
    name: 'Someday I will become more expensive',
    artist: knownAim._id,
    year: 2024,
    image: 'fixtures/dima-shish.jpeg',
    user: user_3._id,
  });

  const [track_1, track_2, track_3] = await Track.create({
    name: 'In da Club',
    album: album_2._id,
    duration: '3:20',
    numberInAlbum: 1,
    trackUrl: '5qm8PH4xAss',
    user: user_3._id,
  }, {
    name: 'Window Shopper',
    album: album_2._id,
    duration: '2:40',
    numberInAlbum: 3,
    trackUrl: 'bFLow5StvvU',
    user: user_3._id,
  }, {
    name: 'P.I.M.P.',
    album: album_2._id,
    duration: '2:50',
    numberInAlbum: 2,
    trackUrl: 'UDApZhXTpH8',
    user: user_3._id,
  }, {
    name: 'Poppin Them Thangs',
    album: album_2._id,
    duration: '3:00',
    numberInAlbum: 4,
    trackUrl: 'lc0zKB88XPM',
    user: user_3._id,
  },{
    name: 'Like My Style',
    album: album_2._id,
    duration: '3:40',
    numberInAlbum: 5,
    trackUrl: null,
    user: user_3._id,
  }, {
    name: 'loot (favour yeah)',
    album: album_1._id,
    duration: '2:30',
    numberInAlbum: 3,
    trackUrl: 'PAjD4GFi3Ko',
    user: user_3._id,
  }, {
    name: '99 problems (fallout)',
    album: album_1._id,
    duration: '2:25',
    numberInAlbum: 1,
    trackUrl: 'n_axmYF2q1E',
    user: user_3._id,
  },{
    name: 'Million',
    album: album_1._id,
    duration: '2:40',
    numberInAlbum: 2,
    trackUrl: null,
    user: user_3._id,
  },{
    name: '5 nights crazy (goya)',
    album: album_1._id,
    duration: '2:18',
    numberInAlbum: 4,
    trackUrl: 'vsmC9puHk5g',
    user: user_3._id,
  },{
    name: 'Ladidadida',
    album: album_1._id,
    duration: '1:58',
    numberInAlbum: 5,
    trackUrl: null,
    user: user_3._id,
  },{
    name: 'SUNSET',
    album: album_3._id,
    duration: '3:56',
    numberInAlbum: 1,
    trackUrl: '36s9uEaVpr4',
    user: user_3._id,
  },{
    name: 'Растет тариф',
    album: album_3._id,
    duration: '3:09',
    numberInAlbum: 2,
    trackUrl: 'B2k44uAyN18',
    user: user_3._id,
  },{
    name: 'Экспресс',
    album: album_3._id,
    duration: '3:12',
    numberInAlbum: 3,
    trackUrl: '317RHaFF7Xk',
    user: user_3._id,
  },{
    name: 'Space',
    album: album_3._id,
    duration: '3:54',
    numberInAlbum: 4,
    trackUrl: 'r4pPvskrmoo',
    user: user_3._id,
  },{
    name: 'АЛИ',
    album: album_3._id,
    duration: '3:54',
    numberInAlbum: 5,
    trackUrl: 'As3LGNTlPQ0',
    user: user_3._id,
  },{
    name: 'Балуюсь',
    album: album_4._id,
    duration: '1:55',
    numberInAlbum: 1,
    trackUrl: '-yee7X7zhrw',
    user: user_3._id,
  },{
    name: 'Снег',
    album: album_4._id,
    duration: '2:59',
    numberInAlbum: 2,
    trackUrl: 'Q0_0XT_RFIg',
    user: user_3._id,
  },{
    name: 'Мистика',
    album: album_4._id,
    duration: '1:28',
    numberInAlbum: 3,
    trackUrl: 'XxvqPjxgUxs',
    user: user_3._id,
  },{
    name: 'Стресс',
    album: album_4._id,
    duration: '3:03',
    numberInAlbum: 5,
    trackUrl: 'xDLZolwnlZg',
    user: user_3._id,
  },{
    name: 'Эзотерик',
    album: album_4._id,
    duration: '3:11',
    numberInAlbum: 4,
    trackUrl: 'SJs4x8pNZ4g',
    user: user_3._id,
  },);

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
