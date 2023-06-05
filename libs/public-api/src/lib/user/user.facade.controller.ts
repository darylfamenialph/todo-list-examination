import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
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
import { BearerAuthGuard } from '@todo-list-examination/guards';

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
  }

  @UseInterceptors(ApiResponseInterceptor)
  @Post('/log-in')
  async login(
    @Body('username') username: string,
    @Body('password') password: string
  ) {
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
  }

  @UseGuards(BearerAuthGuard)
  @Get('/get-all-users')
  async getUsers() {
    const result = await this._userFacadeService.getAllUsers();

    return {
      data: result,
    };
  }
}
