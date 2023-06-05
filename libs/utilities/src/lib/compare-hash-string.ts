import * as bcrypt from 'bcrypt';

export const compareHashString = async (str: string, hashStr: string) => {
  try {
    const result = bcrypt.compare(str, hashStr);
    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};
