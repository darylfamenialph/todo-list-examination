import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  addUserService,
  AddUserServiceInput,
  deleteUserByIdService,
  DeleteUserByIdServiceInput,
  getAllUsersService,
  getUserByIdService,
  GetUserByIdServiceInput,
  getUserByUsernameService,
  GetUserByUsernameServiceInput,
  updateUserByIdService,
  UpdateUserByIdServiceInput,
} from './controllers';
import { User, UserDocument } from './schema';

@Injectable()
export class UserFacadeService {
  constructor(
    @InjectModel(User.name)
    private readonly _userModelDocument: Model<UserDocument>
  ) {}

  async addUser(input: AddUserServiceInput) {
    return addUserService({
      ...input,
      userDocumentModel: this._userModelDocument,
    });
  }

  async deleteUserById(input: DeleteUserByIdServiceInput) {
    return deleteUserByIdService({
      ...input,
      userDocumentModel: this._userModelDocument,
    });
  }

  async getAllUsers() {
    return getAllUsersService({
      userDocumentModel: this._userModelDocument,
    });
  }

  async getUserById(input: GetUserByIdServiceInput) {
    return getUserByIdService({
      ...input,
      userDocumentModel: this._userModelDocument,
    });
  }

  async updateUserById(input: UpdateUserByIdServiceInput) {
    return updateUserByIdService({
      ...input,
      userDocumentModel: this._userModelDocument,
    });
  }

  async getUserByUsername(input: GetUserByUsernameServiceInput) {
    return getUserByUsernameService({
      ...input,
      userDocumentModel: this._userModelDocument,
    });
  }
}
