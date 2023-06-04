import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PublicApiModule } from '@todo-list-examination/public-api';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PublicApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
