import config from 'config';
import app from './app';
import logger from './utils/logger';

const PORT = config.get('port');
const ENV = process.env.NODE_ENV;

const server = app.listen(PORT, () => {
  logger.info(`ENV: ${ENV}`);
  logger.info(`🚀 Server listening on the port ${PORT}`);
});

export default server;
