export const Errors = {
  NOT_FOUND: "Not Found",
  INTERNAL_ERROR: "Internal Error",
};

export class CustomError {
  message!: string;
  status!: number;
  additionalInfo!: any;

  constructor(message: string, status: number = 500, additionalInfo: any = {}) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}

export class NotFoundError extends CustomError {
  constructor(additionalInfo: any = {}) {
    super(Errors.NOT_FOUND);
    this.status = 404;
    this.additionalInfo = additionalInfo;
  }
}

export class InternalError extends CustomError {
  constructor(message?: string, additionalInfo: any = {}) {
    super(message || Errors.INTERNAL_ERROR);
    this.additionalInfo = additionalInfo;
  }
}
