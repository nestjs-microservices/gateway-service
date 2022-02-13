import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ClientsModule } from '@nestjs/microservices';
import { AppService } from '../domain/services/app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from '../application/interceptors/transform.interceptor';
import { UserController } from './controllers/user.controller';
import { UserService } from '../domain/services/user.service';
import { CreateUserUseCase } from '../application/use-cases/create-user/create-user.use-case';
import { GetUserByIdUseCase } from '../application/use-cases/get-user-by-id/get-user-by-id.use-case';

const USE_CASES = [CreateUserUseCase, GetUserByIdUseCase];

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        options: {
          host: '0.0.0.0',
          port: 8888,
        },
      },
    ]),
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserService,
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    ...USE_CASES,
  ],
})
export class PresentationModule {}
