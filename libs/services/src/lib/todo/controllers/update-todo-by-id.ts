import { Model, ObjectId } from 'mongoose';
import { ToDoDocument } from '../schema';

export interface UpdateToDoByIdServiceInput {
  id: ObjectId;
}

interface input extends UpdateToDoByIdServiceInput {
  todoDocumentModel: Model<ToDoDocument>;
}

export const updateToDoByIdService = async ({
  id,
  todoDocumentModel,
}: input) => {
  try {
    return todoDocumentModel.find({ _id: id }).exec();
  } catch (err: any) {
    throw new Error(err);
  }
};
