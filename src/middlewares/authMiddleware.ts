import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ 
      error: "Unauthorized", 
      message: "Giriş icazəsi yoxdur: Token təmin edilməyib!" 
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET || "default_secret";
    const decoded = jwt.verify(token, secret) as any;
    req.user = decoded;
    next();
  } catch (error) {
    // Token vaxtı bitdikdə xüsusi idarəetmə
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ 
        error: "Unauthorized", 
        message: "Tokenin istifadə müddəti bitmişdir. Xahiş olunur yenidən daxil olun!" 
      });
    }

    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ 
        error: "Unauthorized", 
        message: "Etibarsız və ya zədələnmiş token!" 
      });
    }

    return res.status(401).json({ 
      error: "Unauthorized", 
      message: "Autentifikasiya xətası baş verdi!" 
    });
  }
};