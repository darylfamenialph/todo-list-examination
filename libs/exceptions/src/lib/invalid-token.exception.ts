import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidTokenException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.FORBIDDEN,
        message: 'Invalid Token Signature',
        timestamp: new Date(),
      },
      HttpStatus.FORBIDDEN
    );
  }
}
