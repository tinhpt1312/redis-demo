import { config } from 'dotenv';

config();

export const ENV = {
  APP_PORT: process.env.APP_PORT ?? 3000,
  DATABASE: {
    HOST: process.env.DB_HOST,
    PORT: Number(process.env.DB_PORT),
    NAME: process.env.DB_USERNAME,
    PASS: process.env.DB_PASSWORD,
    DATA: process.env.DB_DATABASE,
  },
  HTTPS: {
    ENABLE: process.env.HTTPS_ENABLE === 'true',
    KEY_PATH: process.env.HTTPS_KEY_PATH,
    CERT_PATH: process.env.HTTPS_CERT_PATH,
    LOCAL_DOMAIN: process.env.HTTPS_LOCAL_DOMAIN,
  },
  MAIL: {
    USER: process.env.MAIL_USER,
    PASS: process.env.MAIL_PASS,
    HOST: process.env.MAIL_HOST,
    PORT: Number(process.env.MAIL_PORT),
  },
};
