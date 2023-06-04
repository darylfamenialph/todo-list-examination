import { HttpException, HttpStatus } from '@nestjs/common';

export class UnAuthorizedAccessException extends HttpException {
  constructor(message: Record<string, any>) {
    super(
      {
        status: HttpStatus.UNAUTHORIZED,
        message,
        timestamp: new Date(),
      },
      HttpStatus.UNAUTHORIZED
    );
  }
}
