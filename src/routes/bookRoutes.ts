import { Router } from "express";
import { BookController } from "../controllers/BookController";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { CreateBookDto } from "../dtos/CreateBookDto";
import { authenticateJwt } from "../middlewares/authMiddleware";

const router = Router();
const bookController = new BookController();

// İctimai (Public) marşrutlar - Token tələb olunmur
router.get("/", bookController.findAll);
router.get("/:id", bookController.findOne);

// Qorunan (Protected) marşrutlar - Token tələb olunur (authenticateJwt)
router.post("/", authenticateJwt, validationMiddleware(CreateBookDto), bookController.create);
router.put("/:id", authenticateJwt, validationMiddleware(CreateBookDto), bookController.update);
router.delete("/:id", authenticateJwt, bookController.delete);

export default router;