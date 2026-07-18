import { Router } from "express";
import { AuthorController } from "../controllers/AuthorController";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { CreateAuthorDto } from "../dtos/CreateAuthorDto";

const router = Router();
const authorController = new AuthorController();

router.post("/", validationMiddleware(CreateAuthorDto), authorController.create);
router.put("/:id", validationMiddleware(CreateAuthorDto), authorController.update);

router.get("/", authorController.findAll);
router.get("/:id", authorController.findOne);
router.delete("/:id", authorController.delete);

export default router;