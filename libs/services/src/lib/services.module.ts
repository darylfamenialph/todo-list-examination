import { Module } from '@nestjs/common';
import { ToDoModule } from './todo';
import { UserModule } from './user';

@Module({
  imports: [ToDoModule, UserModule],
  exports: [ToDoModule, UserModule],
})
export class ServicesModule {}
