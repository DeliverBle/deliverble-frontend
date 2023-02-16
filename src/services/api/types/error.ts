export interface CustomError extends Error {
  code: number;
}

export class BadRequestError implements CustomError {
  code: 400;
  name: 'Bad Request Error';
  message: string;

  constructor(message: string) {
    this.code = 400;
    this.name = 'Bad Request Error';
    this.message = message.endsWith('.') ? message : message + '입니다.';
  }
}

export class UnauthorizedError implements CustomError {
  code: 401;
  name: 'Unauthorized Error';
  message: string;

  constructor(message: string) {
    this.code = 401;
    this.name = 'Unauthorized Error';
    this.message = message.endsWith('.') ? message : message + '입니다.';
  }
}

export class ForbiddenError implements CustomError {
  code: 403;
  name: 'Forbidden Error';
  message: string;

  constructor(message: string) {
    this.code = 403;
    this.name = 'Forbidden Error';
    this.message = message;
  }
}

export class InternalServerError implements CustomError {
  code: 500;
  name: 'Internal Server Error';
  message: string;

  constructor(message: string) {
    this.code = 500;
    this.name = 'Internal Server Error';
    this.message = message + '입니다.';
  }
}
