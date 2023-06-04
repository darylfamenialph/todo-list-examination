import { ObjectId } from 'mongodb';

export const convertStringToObjectId = (str: string): ObjectId => {
  return new ObjectId(str);
};
