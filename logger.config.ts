import { iLOGGER } from './logger.interface';

export const DEFAUT_LOGGER_CONFIG: iLOGGER = {
  LABEL: 'NEST_SERVICE',
  LEVEL: 'debug',
  FILE_NAME: `%DATE%`,
  FILE_EXTENSION: '.log',
  FILE_NAME_DATE_PATTERN: 'YYYY-MM-DD',
  FILE_NAME_IN_UTC: false,
  DIR_NAME: 'logs',
  GZIP_ARCHIVED: true,
  FILE_MAX_SIZE: '20m',
  FILE_KEEP_FOR: '14d',
  EXIT_ON_ERROR: false,
};

export const LOG_COLORS = {
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
};
