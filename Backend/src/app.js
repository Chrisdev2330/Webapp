import express from 'express';
import cors from 'cors';
const app = express();
import bodyParser from 'body-parser';

app.use(cors());
app.use(bodyParser.json());

export default app;