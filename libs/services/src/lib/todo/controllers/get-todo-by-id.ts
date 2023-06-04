import { Model, ObjectId } from 'mongoose';
import { ToDoDocument } from '../schema';

export interface GetToDoByIdServiceInput {
  id: ObjectId;
}

interface input extends GetToDoByIdServiceInput {
  todoDocumentModel: Model<ToDoDocument>;
}
export const getToDoByIdService = async ({ id, todoDocumentModel }: input) => {
  try {
    return todoDocumentModel.find({ _id: id }).exec();
  } catch (err: any) {
    throw new Error(err);
  }
};
