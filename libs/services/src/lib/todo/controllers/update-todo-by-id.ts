import { Model } from 'mongoose';
import { ToDoDocument } from '../schema';
import { ObjectId } from 'mongodb';

export interface UpdateToDoByIdServiceInput {
  id: ObjectId;
  title: string;
  description: string;
  status: string;
  userId: ObjectId;
}

interface input extends UpdateToDoByIdServiceInput {
  todoDocumentModel: Model<ToDoDocument>;
}

export const updateToDoByIdService = async ({
  id,
  title,
  description,
  status,
  userId,
  todoDocumentModel,
}: input) => {
  try {
    const setQuery: any = {};

    if (title) {
      setQuery.title = title;
    }

    if (description) {
      setQuery.description = description;
    }

    if (status) {
      setQuery.status = status;
    }

    return todoDocumentModel
      .updateOne(
        { _id: id, createdBy: userId },
        {
          $set: setQuery,
        }
      )
      .exec();
  } catch (err: any) {
    throw new Error(err);
  }
};
