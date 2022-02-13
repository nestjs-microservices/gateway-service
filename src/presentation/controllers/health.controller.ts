import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private microServiceHealthIndicator: MicroserviceHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      async () =>
        this.microServiceHealthIndicator.pingCheck('tcp', {
          transport: Transport.TCP,
          options: { host: '0.0.0.0', port: 8888 },
        }),
    ]);
  }
}
