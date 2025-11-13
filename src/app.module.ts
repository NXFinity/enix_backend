import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Configuration Variables
import environment from './config/environment';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [],
      isGlobal: true,
      load: [environment],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
