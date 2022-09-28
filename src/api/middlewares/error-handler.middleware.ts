import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../common/errors";

function handleError(
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      "Something unexpetedly happens. Please try again later."
    );
  }

  res.status((customError as CustomError).status).send(customError);
}

export default handleError;
