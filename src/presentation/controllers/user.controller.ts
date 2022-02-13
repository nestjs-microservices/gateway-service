import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() args) {
    return this.userService.createUser(args);
  }

  @Get('email/:email')
  getUser(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
}
