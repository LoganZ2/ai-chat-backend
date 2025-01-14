import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/api.js';

const app = express();

app.use(bodyParser.json());
app.use('/chat', apiRoutes);

export default app;
