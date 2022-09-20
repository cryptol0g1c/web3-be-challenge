/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../library/errorResponse';

export default function (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction,
): Response<any, Record<string, any>> {
  let error: ErrorResponse&{[key:string]:any} = { ...err };
  error.message = err.message;
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val:any) => val.message);
    error = new ErrorResponse(String(message), 400);
  }

  if (error.message?.split(/\n/).length > 1) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
        .replace(/\t/, '')
        .split('\n')
        .filter((e: string) => e !== '') || 'Internal server error',
    });
  }
  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal server error',
  });
}
