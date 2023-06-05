import { HttpException, HttpStatus } from '@nestjs/common';

export class UnsupportedAuthTypeException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.FORBIDDEN,
        message: 'Unsupported Authorization Type',
        timestamp: new Date(),
      },
      HttpStatus.FORBIDDEN
    );
  }
}
