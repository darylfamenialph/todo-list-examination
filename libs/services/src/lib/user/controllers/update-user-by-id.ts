import { Model, ObjectId } from 'mongoose';
import { UserDocument } from '../schema';

export interface UpdateUserByIdServiceInput {
  id: ObjectId;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  status: string;
}

interface input extends UpdateUserByIdServiceInput {
  userDocumentModel: Model<UserDocument>;
}

export const updateUserByIdService = async ({
  id,
  username,
  password,
  firstName,
  lastName,
  status,
  userDocumentModel,
}: input) => {
  try {
    const setQuery: any = {};

    if (username) {
      setQuery.username = username;
    }

    if (password) {
      setQuery.password = password;
    }

    if (firstName) {
      setQuery.firstName = firstName;
    }

    if (lastName) {
      setQuery.lastName = lastName;
    }

    if (status) {
      setQuery.status = status;
    }

    return userDocumentModel
      .updateOne(
        { _id: id },
        {
          $set: setQuery,
        }
      )
      .exec();
  } catch (err: any) {
    throw new Error(err);
  }
};
