import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { CreateCategoryDto } from "../dtos/CreateCategoryDto";

const router = Router();
const categoryController = new CategoryController();

router.post("/", validationMiddleware(CreateCategoryDto), categoryController.create);
router.put("/:id", validationMiddleware(CreateCategoryDto), categoryController.update);

router.get("/", categoryController.findAll);
router.get("/:id", categoryController.findOne);
router.delete("/:id", categoryController.delete);

export default router;