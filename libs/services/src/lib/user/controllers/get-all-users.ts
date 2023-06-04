import { Model } from 'mongoose';
import { UserDocument } from '../schema';

interface input {
  userDocumentModel: Model<UserDocument>;
}

export const getAllUsersService = async ({ userDocumentModel }: input) => {
  try {
    return userDocumentModel.find().exec();
  } catch (err: any) {
    throw new Error(err);
  }
};
