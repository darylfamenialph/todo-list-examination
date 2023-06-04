import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {
  InvalidTokenException,
  NoAuthHeaderException,
  NoTokenException,
  UnsupportedAuthTypeException,
} from '@todo-list-examination/exceptions';
import { AuthTypes } from '@todo-list-examination/enums';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BearerAuthGuard implements CanActivate {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new NoAuthHeaderException();
    }

    const auth = authHeader?.split(' ');

    if (!auth) {
      throw new UnsupportedAuthTypeException();
    }

    if (auth[0] !== AuthTypes.BEARER) {
      throw new UnsupportedAuthTypeException();
    }

    if (!auth[1]) {
      throw new NoTokenException();
    }

    try {
      const payload = await this._jwtService.verifyAsync(auth[1], {
        secret: this._configService.get<string>('JWT_SECRET'),
      });
      request['user'] = payload;
    } catch (err) {
      throw new InvalidTokenException();
    }

    return true;
  }
}
