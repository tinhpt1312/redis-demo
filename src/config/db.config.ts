import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ENV } from './env.config';

@Injectable()
export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  constructor() {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: ENV.DATABASE.HOST,
      port: ENV.DATABASE.PORT,
      username: ENV.DATABASE.NAME,
      password: ENV.DATABASE.PASS,
      database: ENV.DATABASE.DATA,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
    };
  }
}
