import { Module } from '@nestjs/common';
import { StartupService } from './startup.service';
import { UsersModule } from '../../rest/api/users/users.module';
import { CachingModule } from '@caching/caching';

@Module({
  imports: [UsersModule, CachingModule],
  providers: [StartupService],
})
export class StartupModule {}

