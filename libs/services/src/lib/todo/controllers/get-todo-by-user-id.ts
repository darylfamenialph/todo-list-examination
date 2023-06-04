import { Model, ObjectId } from 'mongoose';
import { ToDoDocument } from '../schema';

export interface GetToDoByUserIdServiceInput {
  userId: ObjectId;
}

interface input extends GetToDoByUserIdServiceInput {
  todoDocumentModel: Model<ToDoDocument>;
}
export const getToDoByUserIdService = async ({
  userId,
  todoDocumentModel,
}: input) => {
  try {
    return todoDocumentModel.find({ createdBy: userId }).exec();
  } catch (err: any) {
    throw new Error(err);
  }
};
