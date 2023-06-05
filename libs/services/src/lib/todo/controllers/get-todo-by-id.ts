import { Model } from 'mongoose';
import { ToDoDocument } from '../schema';
import { ObjectId } from 'mongodb';

export interface GetToDoByIdServiceInput {
  id: ObjectId;
}

interface input extends GetToDoByIdServiceInput {
  todoDocumentModel: Model<ToDoDocument>;
}
export const getToDoByIdService = async ({ id, todoDocumentModel }: input) => {
  try {
    return todoDocumentModel.findById(id).exec();
  } catch (err: any) {
    throw new Error(err);
  }
};
