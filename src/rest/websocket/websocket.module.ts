import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketGateway } from './websocket.gateway';
import { UsersModule } from '../api/users/users.module';
import { RedisModule } from '@redis/redis';
import { LoggingModule } from '@logging/logging';
import { SessionStoreConfig } from '../../config/session-store.config';

@Module({
  imports: [UsersModule, RedisModule, LoggingModule],
  providers: [WebsocketGateway, WebsocketService, SessionStoreConfig],
  exports: [WebsocketService],
})
export class WebsocketModule {}
