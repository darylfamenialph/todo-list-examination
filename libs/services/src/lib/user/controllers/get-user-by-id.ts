import { Model, ObjectId } from 'mongoose';
import { UserDocument } from '../schema';

export interface GetUserByIdServiceInput {
  id: ObjectId;
}

interface input extends GetUserByIdServiceInput {
  userDocumentModel: Model<UserDocument>;
}

export const getUserByIdService = async ({ id, userDocumentModel }: input) => {
  try {
    return userDocumentModel.find({ _id: id }).exec();
  } catch (err: any) {
    throw new Error(err);
  }
};
