import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule } from '@nestjs/microservices';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './config/interceptors/transform.interceptor';

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
export class AppModule {}
