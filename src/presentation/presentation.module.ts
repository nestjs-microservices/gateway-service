import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AppService } from '../application/services/app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from '../application/interceptors/transform.interceptor';
import { UserController } from './controllers/user.controller';
import { CreateUserUseCase } from '../application/use-cases/create-user/create-user.use-case';
import { GetUserByIdUseCase } from '../application/use-cases/get-user-by-id/get-user-by-id.use-case';
import { GetUserByEmailUseCase } from '../application/use-cases/get-user-by-email/get-user-by-email.use-case';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controllers/health.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

const USE_CASES = [
  CreateUserUseCase,
  GetUserByIdUseCase,
  GetUserByEmailUseCase,
];

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        options: {
          host: process.env.USER_SERVICE_HOST,
          port: process.env.USER_SERVICE_PORT,
        },
      },
    ]),
  ],
  controllers: [UserController, HealthController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    ...USE_CASES,
  ],
})
export class PresentationModule {
  constructor(private configService: ConfigService) {}
}
