import * as bcrypt from 'bcrypt';

export const hashString = async (str: string) => {
  try {
    const saltOrRounds = 10;
    return bcrypt.hash(str, saltOrRounds);
  } catch (err: any) {
    throw new Error(err);
  }
};
