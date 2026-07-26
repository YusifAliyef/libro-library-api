import { Request, Response, NextFunction } from "express";
import { UserRole } from "../entities/User";

export const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Giriş icazəsi yoxdur: Istifadəçi tapılmadı!" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message:
          "Giriş qadağandır: Bu əməliyyatı icra etmək üçün yetərli icazəniz (rolunuz) yoxdur!",
      });
    }

    next();
  };
};
