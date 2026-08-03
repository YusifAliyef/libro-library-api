import { Request, Response, NextFunction } from "express";
import { UserRole } from "../entities/User";

export const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: "Unauthorized", 
        message: "Giriş icazəsi yoxdur: İstifadəçi tapılmadı!" 
      });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: "Forbidden", 
        message: "Giriş qadağandır: Bu əməliyyat üçün kifayət qədər səlahiyyətiniz yoxdur!" 
      });
    }

    next();
  };
};