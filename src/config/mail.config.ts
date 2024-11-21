import { Injectable } from '@nestjs/common';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { ENV } from './env.config';

@Injectable()
export class MailConfiguration implements MailerOptionsFactory {
  constructor() {}

  createMailerOptions(): MailerOptions | Promise<MailerOptions> {
    return {
      transport: {
        host: ENV.MAIL.HOST,
        port: ENV.MAIL.PORT,
        secure: false,
        auth: {
          user: ENV.MAIL.USER,
          pass: ENV.MAIL.PASS,
        },
      },
      defaults: {
        from: 'Demo ne',
      },
    };
  }
}
