import { config } from 'dotenv';

config();

export const ENV = {
  APP_PORT: process.env.APP_PORT ?? 3000,
  HTTPS: {
    ENABLE: process.env.HTTPS_ENABLE === 'true',
    KEY_PATH: process.env.HTTPS_KEY_PATH,
    CERT_PATH: process.env.HTTPS_CERT_PATH,
    LOCAL_DOMAIN: process.env.HTTPS_LOCAL_DOMAIN,
  },
};
