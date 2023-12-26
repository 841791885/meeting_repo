import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Role } from './user/entities/role.entity';
import { Permission } from './user/entities/permission.entity';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './email/email.module';
import {
  mysql_server_host,
  mysql_server_port,
  mysql_server_username,
  mysql_server_password,
  mysql_server_database,
  jwt_secret,
} from 'config';
import { JwtModule } from '@nestjs/jwt';
import { PermissionGuard } from './permission.guard';
import { LoginGuard } from './login.guard';
import { APP_GUARD } from '@nestjs/core';
// import { ConfigModule } from '@nestjs/config';
import { MeetingRoomModule } from './meeting-room/meeting-room.module';
import { MeetingRoom } from './meeting-room/entities/meeting-room.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: mysql_server_host,
      port: mysql_server_port,
      username: mysql_server_username,
      password: mysql_server_password,
      database: mysql_server_database,
      synchronize: true,
      logging: false,
      entities: [User, Role, Permission, MeetingRoom],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        return {
          secret: jwt_secret,
          signOptions: {
            expiresIn: '30m', // 默认 30 分钟
          },
        };
      },
    }),

    UserModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: 'src/.env',
    // }),
    RedisModule,
    EmailModule,
    MeetingRoomModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
