import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule } from '@nestjs/microservices';
import { AppService } from './app.service';

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
  providers: [AppService],
})
export class AppModule {}
