import { Module } from '@nestjs/common';
import { AuthModule } from './security/auth/auth.module';
import { RolesModule } from './security/roles/roles.module';
import { UsersModule } from './rest/api/users/users.module';
import { StorageModule } from './tools/storage/storage.module';
import { StorageModule } from './rest/storage/storage.module';
import { WebsocketModule } from './rest/websocket/websocket.module';

@Module({
  imports: [AuthModule, RolesModule, UsersModule, StorageModule, WebsocketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
