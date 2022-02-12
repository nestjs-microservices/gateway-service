import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  pingUserService() {
    return this.userService.send({ cmd: 'ping' }, {});
  }

  createUser(args) {
    return this.userService.send({ cmd: 'createUser' }, args);
  }
}
