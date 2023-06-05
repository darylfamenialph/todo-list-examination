import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import {
  InvalidRequestPayloadException,
  UnAuthorizedAccessException,
} from '@todo-list-examination/exceptions';
import {
  UserDocument,
  UserFacadeService,
} from '@todo-list-examination/services';
import { UserFacadeController } from '../../user/user.facade.controller';
import { compareHashString } from '@todo-list-examination/utilities';

describe('User Facade Controller', () => {
  let userFacadeController: UserFacadeController;
  let userFacadeService: UserFacadeService;
  let userModel: Model<UserDocument>;
  const _jwtService: JwtService = new JwtService({ secret: 'supersecret' });

  beforeEach(() => {
    userFacadeService = new UserFacadeService(userModel);
    userFacadeController = new UserFacadeController(
      userFacadeService,
      _jwtService
    );
  });

  describe('Create New User', () => {
    it('should throw InvalidRequestPayloadException due to missing Username', async () => {
      let result: any;

      jest.spyOn(userFacadeService, 'addUser').mockImplementation(() => result);

      await expect(
        userFacadeController.createNewUser(
          '',
          'testpassword',
          'firstname',
          'lastname'
        )
      ).rejects.toThrowError(InvalidRequestPayloadException);
    });

    it('should throw InvalidRequestPayloadException due to missing Password', async () => {
      let result: any;

      jest.spyOn(userFacadeService, 'addUser').mockImplementation(() => result);

      await expect(
        userFacadeController.createNewUser(
          'test-username',
          '',
          'firstname',
          'lastname'
        )
      ).rejects.toThrowError(InvalidRequestPayloadException);
    });

    it('should throw InvalidRequestPayloadException due to missing FirstName', async () => {
      let result: any;

      jest.spyOn(userFacadeService, 'addUser').mockImplementation(() => result);

      await expect(
        userFacadeController.createNewUser(
          'test-username',
          'testpassword',
          '',
          'lastname'
        )
      ).rejects.toThrowError(InvalidRequestPayloadException);
    });

    it('should throw InvalidRequestPayloadException due to missing Lastname', async () => {
      let result: any;

      jest.spyOn(userFacadeService, 'addUser').mockImplementation(() => result);

      await expect(
        userFacadeController.createNewUser(
          'test-username',
          'testpassword',
          'firstname',
          ''
        )
      ).rejects.toThrowError(InvalidRequestPayloadException);
    });

    it('should Successfully Create User', async () => {
      const sampleInputData = {
        username: 'test_username',
        password: 'testpassword',
        firstName: 'Fname',
        lastName: 'lname',
      };

      const sampleExpectedData = {
        _id: 'dfadfafadfasf',
        ...sampleInputData,
      };
      const expectedResult = {
        details: {
          data: sampleExpectedData,
          message: 'User Successfully Created',
        },
      };

      const result: any = sampleExpectedData;
      jest.spyOn(userFacadeService, 'addUser').mockImplementation(() => result);

      expect(
        await userFacadeController.createNewUser(
          sampleInputData.username,
          sampleInputData.password,
          sampleInputData.firstName,
          sampleInputData.lastName
        )
      ).toStrictEqual(expectedResult);
    });
  });

  describe('Login', () => {
    const samplePasswordWithHashedCounterpart = {
      password: 'superpassword',
      hashed: '$2b$10$HcoRprfLWaxFEJeNKetGteU8rjTZFkqKSHn9g7jQCx6gQBkBCciVa',
    };

    it('should throw InvalidRequestPayloadException due to missing username', async () => {
      await expect(
        userFacadeController.login('', 'testPassword')
      ).rejects.toThrowError(InvalidRequestPayloadException);
    });

    it('should throw InvalidRequestPayloadException due to missing password', async () => {
      await expect(
        userFacadeController.login('test_username', '')
      ).rejects.toThrowError(InvalidRequestPayloadException);
    });

    it('should throw UnAuthorizedAccessException due to invalid username', async () => {
      const result: any = undefined;

      jest
        .spyOn(userFacadeService, 'getUserByUsername')
        .mockImplementation(() => result);

      await expect(
        userFacadeController.login('test_username', 'password')
      ).rejects.toThrowError(UnAuthorizedAccessException);
    });

    it('should successfully create access token', async () => {
      const result: any = {
        userId: 'test',
        username: '',
        password: samplePasswordWithHashedCounterpart.hashed,
      };

      jest
        .spyOn(userFacadeService, 'getUserByUsername')
        .mockImplementation(() => result);

      await expect(
        userFacadeController.login(
          'test_username',
          samplePasswordWithHashedCounterpart.password
        )
      ).resolves.toHaveProperty('access_token');
    });
  });
});
