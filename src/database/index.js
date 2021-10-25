import config from 'config';
import { Sequelize } from 'sequelize';
import logger from '../utils/logger';

const { host, port, database, username, password, pool } = config.get('dbConfig');

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: 'postgres',
  pool: {
    min: pool.min,
    max: pool.max,
  },
  logQueryParameters: process.env.NODE_ENV !== 'development',
  logging: (query, time) => {
    logger.info(`${time}ms ${query}`);
  },
  benchmark: true,
});

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err);
  });

export default sequelize;
