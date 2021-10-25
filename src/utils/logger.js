import fs from 'fs';
import path from 'path';
import winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';

// Logs directory
const logDir = path.join(__dirname, '../../logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message, ...args }) => {
  const more = Object.keys(args).length ? JSON.stringify(args) : '';
  return `${timestamp} ${level}: ${message} ${more}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logConfiguration = {
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat, // format
  ),
  transports: [
    // debug log setting
    new WinstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: `${logDir}/debug`, // log file /logs/debug/*.log in save
      filename: '%DATE%.log',
      maxFiles: 30, // 30 Days saved
      json: false,
      zippedArchive: true,
    }),
    // error log setting
    new WinstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: `${logDir}/error`, // log file /logs/error/*.log in save
      filename: '%DATE%.log',
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
};

const logger = winston.createLogger(logConfiguration);

logger.add(
  new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
      winston.format.colorize(), // colorize
      winston.format.splat(), // splat
      logFormat,
    ),
  }),
);

const stream = {
  write: (message) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

export default logger;
export { stream };
