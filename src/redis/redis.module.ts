// import { ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';
import { redis_server_host, redis_server_port, redis_server_db } from 'config';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: redis_server_host,
            port: redis_server_port,
          },
          database: redis_server_db,
        });
        await client.connect();
        return client;
      },
      // inject: [ConfigService],
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
