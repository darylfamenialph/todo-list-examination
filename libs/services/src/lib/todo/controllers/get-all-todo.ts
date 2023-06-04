import { Model } from 'mongoose';
import { ToDoDocument } from '../schema';

interface input {
  todoDocumentModel: Model<ToDoDocument>;
}

export const getAllToDoService = async ({ todoDocumentModel }: input) => {
  try {
    return todoDocumentModel.find().exec();
  } catch (err: any) {
    throw new Error(err);
  }
};
