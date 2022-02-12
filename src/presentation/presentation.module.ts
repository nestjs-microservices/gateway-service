import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ClientsModule } from '@nestjs/microservices';
import { AppService } from '../domain/services/app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from '../application/interceptors/transform.interceptor';

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
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})
export class PresentationModule {}
