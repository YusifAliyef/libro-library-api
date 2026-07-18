import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Mərkəzi Xəta Tutuldu:", err.message);

  const statusCode = err.status || 500;
  return res.status(statusCode).json({
    status: statusCode,
    error: err.name || "Internal Server Error",
    message: err.message || "Gözlənilməz bir xəta baş verdi."
  });
};