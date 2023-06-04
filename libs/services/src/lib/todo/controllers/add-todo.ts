import { Model } from 'mongoose';
import { ToDoDocument } from '../schema';

export interface AddToDoServiceInput {
  title: string;
  description?: string;
  status: string;
  createdBy: string;
}

interface input extends AddToDoServiceInput {
  todoDocumentModel: Model<ToDoDocument>;
}

export const addToDoService = async ({
  title,
  description,
  status,
  createdBy,
  todoDocumentModel,
}: input) => {
  try {
    return new todoDocumentModel({
      title,
      description,
      status,
      createdBy,
    }).save();
  } catch (err: any) {
    throw new Error(err);
  }
};
