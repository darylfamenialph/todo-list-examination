import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidRequestPayloadException extends HttpException {
  constructor(message: Record<string, any>) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        message,
        timestamp: new Date(),
      },
      HttpStatus.BAD_REQUEST
    );
  }
}
