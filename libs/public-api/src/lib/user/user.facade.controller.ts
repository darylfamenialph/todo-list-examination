import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UserFacadeService } from '@todo-list-examination/services';
import { ApiResponseInterceptor } from '@todo-list-examination/interceptors';
import {
  InternalServerErrorException,
  InvalidRequestPayloadException,
  UnAuthorizedAccessException,
} from '@todo-list-examination/exceptions';
import {
  compareHashString,
  hashString,
} from '@todo-list-examination/utilities';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserFacadeController {
  constructor(
    private readonly _userFacadeService: UserFacadeService,
    private readonly _jwtService: JwtService
  ) {}

  @UseInterceptors(ApiResponseInterceptor)
  @Post('/create-new')
  async createNewUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string
  ) {
    try {
      if (!(username && password && firstName && lastName)) {
        throw new InvalidRequestPayloadException({
          erorrCode: 'Missing Information',
          errorDescription:
            'username, password, firstName and/or lastName are required',
        });
      }

      const result = await this._userFacadeService.addUser({
        username,
        password: await hashString(password),
        firstName,
        lastName,
        status: 'active',
      });

      return {
        details: { message: 'User Successfully Created', data: result },
      };
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @UseInterceptors(ApiResponseInterceptor)
  @Post('/log-in')
  async login(
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    try {
      if (!(username && password)) {
        throw new InvalidRequestPayloadException({
          erorrCode: 'Missing Information',
          errorDescription: 'username and/or password are required',
        });
      }

      const result = await this._userFacadeService.getUserByUsername({
        username,
      });

      if (!result) {
        throw new UnAuthorizedAccessException({
          erorrCode: 'Invalid Credentials',
          errorDescription: 'username not found',
        });
      }

      if (!(await compareHashString(password, result.password))) {
        throw new UnAuthorizedAccessException({
          erorrCode: 'Invalid Credentials',
          errorDescription: 'password is incorrect',
        });
      }

      const payload = { userId: result._id, username };
      const token = await this._jwtService.signAsync(payload);
      return {
        type: 'Bearer',
        access_token: token,
      };
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
