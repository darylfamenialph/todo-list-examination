import { Model, ObjectId } from 'mongoose';
import { UserDocument } from '../schema';

export interface DeleteUserByIdServiceInput {
  id: ObjectId;
}

interface input extends DeleteUserByIdServiceInput {
  userDocumentModel: Model<UserDocument>;
}

export const deleteUserByIdService = async ({
  id,
  userDocumentModel,
}: input) => {
  try {
    return userDocumentModel.find({ _id: id }).exec();
  } catch (err: any) {
    throw new Error(err);
  }
};
