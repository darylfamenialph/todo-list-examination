import { Model, ObjectId } from 'mongoose';
import { ToDoDocument } from '../schema';

export interface UpdateToDoByIdServiceInput {
  id: ObjectId;
  title: string;
  description: string;
  status: string;
  createdBy: ObjectId;
}

interface input extends UpdateToDoByIdServiceInput {
  todoDocumentModel: Model<ToDoDocument>;
}

export const updateToDoByIdService = async ({
  id,
  title,
  description,
  status,
  createdBy,
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

    if (createdBy) {
      setQuery.createdBy = createdBy;
    }

    return todoDocumentModel
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
