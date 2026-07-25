import { UserRole } from "../entities/User";

// Express-in Request interfeysini genişləndirdim ki, TypeScript req.user-i tanısın.
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        role: UserRole;
      };
    }
  }
}