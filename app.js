import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/api.js';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());
app.use('/chat', apiRoutes);

export default app;
