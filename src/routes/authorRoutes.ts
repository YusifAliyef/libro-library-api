import { Router } from "express";
import { AuthorController } from "../controllers/AuthorController";

const router = Router();
const authorController = new AuthorController();

router.post("/", authorController.create);
router.get("/", authorController.findAll);

export default router;