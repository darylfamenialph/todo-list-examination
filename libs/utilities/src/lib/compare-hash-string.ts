import * as bcrypt from 'bcrypt';

export const compareHashString = async (str: string, hashStr: string) => {
  try {
    return bcrypt.compare(str, hashStr);
  } catch (err: any) {
    throw new Error(err);
  }
};
