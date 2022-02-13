import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../../domain/services/user.service';
import { CreateUserUseCase } from '../../application/use-cases/create-user/create-user.use-case';
import { CreateUserPayload } from '../../application/use-cases/create-user/create-user.payload';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Post()
  createUser(@Body() args: CreateUserPayload) {
    return this.createUserUseCase.exec(args);
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
