import * as Transport from 'winston-transport';
import * as winston from 'winston';
import * as logger from 'gelf-pro';
import { iLOGGER } from './logger.interface';
import { DEFAUT_LOGGER_CONFIG } from './logger.config';

class GelfTransport extends Transport {
  constructor(opts?) {
    super(opts);
    logger.setConfig({
      fields: {
        env: process.env.NODE_ENV || 'development',
      },
      adapterName: 'udp',
      adapterOptions: {
        host: process.env.GRAYLOG_HOST,
        port: Number(process.env.GRAYLOG_PORT),
      },
    });
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });
    const { level, message, data, error, reqBody, ...meta } = info;
    const meta_payload = { ...meta };
    if (data) {
      meta_payload.data =
        'object' === typeof data ? JSON.stringify(data) : data;
    }
    if (error) {
      meta_payload.error =
        'object' === typeof error ? JSON.stringify(error) : error;
    }
    if (reqBody) {
      meta_payload.reqBody =
        'object' === typeof reqBody ? JSON.stringify(reqBody) : reqBody;
    }
    logger[level](message, meta_payload);
    callback();
  }
}

export class GraylogTransporter {
  static getTransporter(config?: iLOGGER) {
    const LOGGER_CONFIG = {
      ...DEFAUT_LOGGER_CONFIG,
      ...config,
    };
    return new GelfTransport({
      level: LOGGER_CONFIG.LEVEL,
      format: winston.format.combine(
        winston.format.label({ label: LOGGER_CONFIG.LABEL }),
        winston.format.timestamp(),
        winston.format.json(),
      ),
    });
  }
}
