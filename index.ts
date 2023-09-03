import express from 'express';
import cors from 'cors';
import * as mongoose from "mongoose";
import artistsRouter from "./routers/artists";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/artists', artistsRouter);

const run = async () => {
  await mongoose.connect('mongodb://localhost/music');

  app.listen(port, () => {
    console.log(`port is running at ${port} port`);
  });
};

run().catch(e => console.error(e));