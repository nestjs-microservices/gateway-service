import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  createUser(@Body() args) {
    return this.userService.createUser(args);
  }
}
