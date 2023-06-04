import { Model } from 'mongoose';
import { UserDocument } from '../schema';

export interface GetUserByUsernameServiceInput {
  username: string;
}

interface input extends GetUserByUsernameServiceInput {
  userDocumentModel: Model<UserDocument>;
}

export const getUserByUsernameService = async ({
  username,
  userDocumentModel,
}: input) => {
  try {
    return userDocumentModel.findOne({ username }).exec();
  } catch (err: any) {
    throw new Error(err);
  }
};
