import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PublicApiModule } from '@todo-list-examination/public-api';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PublicApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
