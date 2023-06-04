import { Model, ObjectId } from 'mongoose';
import { ToDoDocument } from '../schema';

export interface GetToDoByUserIdServiceInput {
  userId: ObjectId;
  page: number;
  limit: number;
}

interface input extends GetToDoByUserIdServiceInput {
  todoDocumentModel: Model<ToDoDocument>;
}
export const getToDoByUserIdService = async ({
  userId,
  page,
  limit,
  todoDocumentModel,
}: input) => {
  try {
    const paginatedPage = Math.max(1, page) || 1;

    const calculatedLimit = limit || 1;

    const [total, result] = await Promise.all([
      todoDocumentModel.count({ createdBy: userId }).exec(),
      todoDocumentModel
        .find({ createdBy: userId })
        .skip(calculatedLimit * (paginatedPage - 1))
        .limit(calculatedLimit)
        .exec(),
    ]);

    const calculateTotalPages = Math.ceil(total / calculatedLimit);

    return {
      totalItems: total,
      totalPages: calculateTotalPages,
      currentPage: `${page}/${calculateTotalPages}`,
      data: result,
    };
  } catch (err: any) {
    throw new Error(err);
  }
};
