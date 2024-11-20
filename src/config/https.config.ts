import * as fs from 'node:fs';

import { ENV } from './env.config';

export const httpsOptions = {
  key: ENV.HTTPS.KEY_PATH ? fs.readFileSync(ENV.HTTPS.KEY_PATH) : undefined,
  cert: ENV.HTTPS.CERT_PATH ? fs.readFileSync(ENV.HTTPS.CERT_PATH) : undefined,
};
