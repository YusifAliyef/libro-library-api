import { Router } from "express";
import { BookController } from "../controllers/BookController";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { CreateBookDto } from "../dtos/CreateBookDto";
import { authenticateJwt } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/roleMiddleware";
import { UserRole } from "../entities/User";

const router = Router();
const bookController = new BookController();

// Hər kəs baxa bilər
router.get("/", bookController.findAll);
router.get("/:id", bookController.findOne);

// USER və ADMIN yeni kitab yarada bilər
router.post(
  "/",
  authenticateJwt,
  authorizeRoles(UserRole.USER, UserRole.ADMIN),
  validationMiddleware(CreateBookDto),
  bookController.create,
);

// Yalnız ADMIN yeniləyə və silə bilər
router.put(
  "/:id",
  authenticateJwt,
  authorizeRoles(UserRole.ADMIN),
  validationMiddleware(CreateBookDto),
  bookController.update,
);
router.delete(
  "/:id",
  authenticateJwt,
  authorizeRoles(UserRole.ADMIN),
  bookController.delete,
);

export default router;
