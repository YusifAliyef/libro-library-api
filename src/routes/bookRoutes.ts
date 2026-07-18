import { Router } from "express";
import { BookController } from "../controllers/BookController";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { CreateBookDto } from "../dtos/CreateBookDto";

const router = Router();
const bookController = new BookController();


router.post("/", validationMiddleware(CreateBookDto), bookController.create);
router.put("/:id", validationMiddleware(CreateBookDto), bookController.update);

router.get("/", bookController.findAll);
router.get("/:id", bookController.findOne);
router.delete("/:id", bookController.delete);

export default router;