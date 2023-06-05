import { HttpException, HttpStatus } from '@nestjs/common';

export class NoAuthHeaderException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.FORBIDDEN,
        message: 'No Authorization Header Found',
        timestamp: new Date(),
      },
      HttpStatus.FORBIDDEN
    );
  }
}
