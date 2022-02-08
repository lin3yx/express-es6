import config from 'config';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import indexRoute from './routes/index.route';
import { stream } from './utils/logger';
// import dbConnection from './database/index';

const app = express();

// Connect to database
// dbConnection.sync({ force: false });

// Initialize middleware
app.use(morgan(config.get('log.format'), { stream }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize routes
app.use('/', indexRoute);

export default app;
