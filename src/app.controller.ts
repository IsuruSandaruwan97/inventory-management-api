import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('#')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('favicon.ico') 
  getFavIcon(){
    return this.appService.getFavIcon();
  }

}
