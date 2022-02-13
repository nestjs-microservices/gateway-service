import { UseCase } from '../base.use-case';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetUserByIdUseCase implements UseCase {
  constructor(
    @Inject('USER_SERVICE') private readonly clientProxy: ClientProxy,
  ) {}

  exec(payload) {
    return this.clientProxy.send({ cmd: 'getUserById' }, payload);
  }
}
