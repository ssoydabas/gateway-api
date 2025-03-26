import pino from 'pino';
import { nodeEnv, logLevel } from '../../constants';

export const options: pino.LoggerOptions = {
  level: logLevel,
  base: {
    env: nodeEnv,
    version: process.env['npm_package_version'],
  },
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
  formatters: {
    level(label) {
      return {
        level: label,
      };
    },
    bindings(bindings) {
      return {
        pid: bindings['pid'],
        host: bindings['hostname'],
        ...bindings,
      };
    },
  },
  messageKey: 'message',
  errorKey: 'error',
  nestedKey: 'details',
  transport:
    nodeEnv !== 'production'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            levelFirst: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
            messageFormat: '{message}',
            customColors: 'error:red,warn:yellow,info:blue,debug:gray',
          },
        }
      : undefined,
  serializers: {
    error: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
};
