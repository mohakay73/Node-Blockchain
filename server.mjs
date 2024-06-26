import dotenv from 'dotenv';
import cors from 'cors';
import logger from './middleware/logger.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import ErrorResponse from './utilities/ErrorResponseModel.mjs';
import express from 'express';
import ticketsRouter from './routes/tickets-routes.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: './config/config.env' });
const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

global.__appdir = dirname;

app.use(express.json());
app.use(cors());

app.use(logger);

app.use('/api/v1/tickets', ticketsRouter);

app.all('*', (req, res, next) => {
  next(new ErrorResponse(`Kunde inte hitta resursen ${req.originalUrl}`, 404));
});

app.use(errorHandler);

const PORT = process.env.PORT || 5010;
app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));
