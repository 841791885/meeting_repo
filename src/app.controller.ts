import { Controller, Get, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('aaa')
  @SetMetadata('require-login', false)
  @SetMetadata('require-permission', ['ccc'])
  getHello(): string {
    return this.appService.getHello();
  }
}
