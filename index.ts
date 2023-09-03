import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {

  app.listen(port, () => {
    console.log(`port is running at ${port} port`);
  });
};

run().catch(e => console.error(e));