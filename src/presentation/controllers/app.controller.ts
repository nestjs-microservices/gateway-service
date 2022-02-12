import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../../domain/services/app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health/user-service')
  checkUserServiceHealth(): Observable<string> {
    return this.appService.pingUserService();
  }

  @Post('users')
  createUser(@Body() args) {
    return this.appService.createUser(args);
  }
}
