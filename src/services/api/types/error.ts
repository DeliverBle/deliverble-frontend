export interface CustomError extends Error {
  statusCode: number;
}

export class BadRequestError implements CustomError {
  statusCode: 400;
  name: 'Bad Request Error';
  message: string;

  constructor(message: string) {
    this.statusCode = 400;
    this.name = 'Bad Request Error';
    this.message = message.endsWith('.') ? message : message + '입니다.';
  }
}

export class UnauthorizedError implements CustomError {
  statusCode: 401;
  name: 'Unauthorized Error';
  message: string;

  constructor(message: string) {
    this.statusCode = 401;
    this.name = 'Unauthorized Error';
    this.message = message.endsWith('.') ? message : message + '입니다.';
  }
}

export class ForbiddenError implements CustomError {
  statusCode: 403;
  name: 'Forbidden Error';
  message: string;

  constructor(message: string) {
    this.statusCode = 403;
    this.name = 'Forbidden Error';
    this.message = message;
  }
}

export class InternalServerError implements CustomError {
  statusCode: 500;
  name: 'Internal Server Error';
  message: string;

  constructor(message: string) {
    this.statusCode = 500;
    this.name = 'Internal Server Error';
    this.message = message + '입니다.';
  }
}
