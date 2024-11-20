import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Redis Demo')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('redis')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('redis/set')
  setRedis(): string {
    return 'this.appService.setRedis()';
  }
}
