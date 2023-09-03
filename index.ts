import express from 'express';
import cors from 'cors';
import * as mongoose from "mongoose";
import artistsRouter from "./routers/artists";
import albumsRouter from "./routers/albums";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);

const run = async () => {
  await mongoose.connect('mongodb://localhost/music');

  app.listen(port, () => {
    console.log(`port is running at ${port} port`);
  });
};

run().catch(e => console.error(e));