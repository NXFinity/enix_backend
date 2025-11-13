import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { SeedService } from './seed/seed.service';

@Module({
  providers: [DatabaseService, SeedService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
