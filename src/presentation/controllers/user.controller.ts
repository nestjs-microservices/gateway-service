import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user/create-user.use-case';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id/get-user-by-id.use-case';
import { GetUserByEmailUseCase } from '../../application/use-cases/get-user-by-email/get-user-by-email.use-case';
import { CreateUserPayload } from '../../application/use-cases/create-user/create-user.payload';
import { UpdateUserUseCase } from '../../application/use-cases/update-user/update-user.use-case';
import { UpdateUserPayload } from '../../application/use-cases/update-user/update-user.payload';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post()
  createUser(@Body() args: CreateUserPayload) {
    return this.createUserUseCase.exec(args);
  }

  @Get('email/:email')
  getUser(@Param('email') email: string) {
    return this.getUserByEmailUseCase.exec(email);
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.getUserByIdUseCase.exec(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() data: UpdateUserPayload) {
    return this.getUserByIdUseCase.exec({ id, data });
  }
}
