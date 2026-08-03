import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { RegisterDto, LoginDto } from "../dtos/AuthDto";

const router = Router();

router.post(
  "/register",
  validationMiddleware(RegisterDto),
  AuthController.register,
);

router.post("/login", validationMiddleware(LoginDto), AuthController.login);

export default router;
