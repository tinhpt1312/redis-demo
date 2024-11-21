import { Module } from '@nestjs/common';
import { VerificationModule } from './verification/verification.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseConfiguration } from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MailConfiguration } from './config/mail.config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfiguration,
    }),
    MailerModule.forRootAsync({
      useClass: MailConfiguration,
    }),
    VerificationModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
