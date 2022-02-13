import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private microServiceHealthIndicator: MicroserviceHealthIndicator,
    private configService: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      async () =>
        this.microServiceHealthIndicator.pingCheck('tcp', {
          transport: Transport.TCP,
          options: {
            host: this.configService.get('USER_SERVICE_HOST'),
            port: this.configService.get('USER_SERVICE_PORT'),
          },
        }),
    ]);
  }
}
