import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  addToDoService,
  AddToDoServiceInput,
  deleteToDoByIdService,
  DeleteToDoByIdServiceInput,
  getAllToDoService,
  getToDoByIdService,
  GetToDoByIdServiceInput,
  getToDoByUserIdService,
  GetToDoByUserIdServiceInput,
  updateToDoByIdService,
  UpdateToDoByIdServiceInput,
} from './controllers';
import { ToDo, ToDoDocument } from './schema';

@Injectable()
export class ToDoFacadeService {
  constructor(
    @InjectModel(ToDo.name)
    private readonly _toDoDocumentModel: Model<ToDoDocument>
  ) {}

  async addToDo(input: AddToDoServiceInput) {
    return addToDoService({
      ...input,
      todoDocumentModel: this._toDoDocumentModel,
    });
  }

  async deleteToDoById(input: DeleteToDoByIdServiceInput) {
    return deleteToDoByIdService({
      ...input,
      todoDocumentModel: this._toDoDocumentModel,
    });
  }

  async getAllToDo() {
    return getAllToDoService({
      todoDocumentModel: this._toDoDocumentModel,
    });
  }

  async getToDoById(input: GetToDoByIdServiceInput) {
    return getToDoByIdService({
      ...input,
      todoDocumentModel: this._toDoDocumentModel,
    });
  }

  async getToDoByUserId(input: GetToDoByUserIdServiceInput) {
    return getToDoByUserIdService({
      ...input,
      todoDocumentModel: this._toDoDocumentModel,
    });
  }

  async updateToDoById(input: UpdateToDoByIdServiceInput) {
    return updateToDoByIdService({
      ...input,
      todoDocumentModel: this._toDoDocumentModel,
    });
  }
}
