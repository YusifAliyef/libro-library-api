import { Router } from "express";
import { AuthorController } from "../controllers/AuthorController";

const router = Router();
const authorController = new AuthorController();

router.post("/", authorController.create);
router.get("/", authorController.findAll);
router.get("/:id", authorController.findOne.bind(authorController));
router.put("/:id", authorController.update.bind(authorController));
router.delete("/:id", authorController.delete.bind(authorController));

export default router;
