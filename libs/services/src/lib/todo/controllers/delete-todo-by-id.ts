import { Model, ObjectId } from 'mongoose';
import { ToDoDocument } from '../schema';

export interface DeleteToDoByIdServiceInput {
  id: ObjectId;
}

interface input extends DeleteToDoByIdServiceInput {
  todoDocumentModel: Model<ToDoDocument>;
}

export const deleteToDoByIdService = async ({
  id,
  todoDocumentModel,
}: input) => {
  try {
    return todoDocumentModel.deleteOne({ _id: id }).exec();
  } catch (err: any) {
    throw new Error(err);
  }
};
