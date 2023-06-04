import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDoFacadeService } from './facade.service';
import { ToDo, ToDoSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ToDo.name, schema: ToDoSchema }]),
  ],
  providers: [ToDoFacadeService],
  exports: [ToDoFacadeService],
})
export class ToDoModule {}
