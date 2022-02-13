import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private readonly userProxy: ClientProxy,
  ) {}

  pingUserService() {
    return this.userProxy.send({ cmd: 'ping' }, {});
  }
}
