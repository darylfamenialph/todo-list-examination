import { Model } from 'mongoose';
import { UserDocument } from '../schema';

export interface AddUserServiceInput {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  status: string;
}

interface input extends AddUserServiceInput {
  userDocumentModel: Model<UserDocument>;
}

export const addUserService = async ({
  username,
  password,
  firstName,
  lastName,
  status,
  userDocumentModel,
}: input) => {
  try {
    return new userDocumentModel({
      username,
      password,
      firstName,
      lastName,
      status,
    }).save();
  } catch (err: any) {
    throw new Error(err);
  }
};
