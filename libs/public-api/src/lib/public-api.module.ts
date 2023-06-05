import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServicesModule } from '@todo-list-examination/services';
import { TodoFacadeController } from './todo';
import { UserFacadeController } from './user';

@Module({
  imports: [
    ServicesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserFacadeController, TodoFacadeController],
  providers: [],
  exports: [],
})
export class PublicApiModule {}
