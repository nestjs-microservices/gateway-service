import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userProxy: ClientProxy,
  ) {}

  createUser(args) {
    return this.userProxy.send({ cmd: 'createUser' }, args);
  }

  getUserByEmail(email: string) {
    return this.userProxy.send({ cmd: 'getUserByEmail' }, email);
  }

  getUserById(id: number) {
    return this.userProxy.send({ cmd: 'getUserById' }, +id);
  }
}
