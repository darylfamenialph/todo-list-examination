import { HttpException, HttpStatus } from '@nestjs/common';

export class NoTokenException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.FORBIDDEN,
        message: 'No Token Provided',
        timestamp: new Date(),
      },
      HttpStatus.FORBIDDEN
    );
  }
}
