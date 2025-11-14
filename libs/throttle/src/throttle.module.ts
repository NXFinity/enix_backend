import { Module, Global } from '@nestjs/common';
import { ThrottleService } from './throttle.service';
import { ThrottleGuard } from './guards/throttle.guard';
import { RedisModule } from '@redis/redis';

@Global()
@Module({
  imports: [RedisModule],
  providers: [ThrottleService, ThrottleGuard],
  exports: [ThrottleService, ThrottleGuard],
})
export class ThrottleModule {}
