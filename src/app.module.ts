import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@database/database';
import { RedisModule } from '@redis/redis';
import { ThrottleModule } from '@throttle/throttle';
import { AuthModule } from './security/auth/auth.module';
import { RolesModule } from './security/roles';
import { UsersModule } from './rest/api/users/users.module';
import { SessionStoreConfig } from './config/session-store.config';

// Validation
import * as Joi from 'joi';
// Guards
import { AuthGuard } from './security/auth/guards/auth.guard';

// Configuration Variables

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
      load: [],
      validationSchema: Joi.object({
        // BASIC VALIDATION
        NODE_ENV: Joi.string()
          .required()
          .valid('development', 'production', 'test')
          .default('development'),
        NODE_HOST: Joi.string().required(),
        NODE_PORT: Joi.number().required(),
      }),
    }),
    DatabaseModule,
    RedisModule,
    ThrottleModule,
    AuthModule,
    RolesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    { provide: 'APP_GUARD', useClass: AuthGuard },
    SessionStoreConfig,
  ],
})
export class AppModule {}
