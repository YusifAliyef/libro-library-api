import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : (err.status || 500);
  const message = err.message || "Daxili server xətası baş verdi";

  return res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};