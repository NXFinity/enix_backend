import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// User Entities
import { User } from './assets/entities/user.entity';
import { Privacy } from './assets/entities/security/privacy.entity';
import { Security } from './assets/entities/security/security.entity';
import { Profile } from './assets/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Privacy, Security]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
