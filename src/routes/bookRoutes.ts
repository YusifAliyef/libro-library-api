import { Router } from "express";
import { BookController } from "../controllers/BookController";

const router = Router();
const bookController = new BookController();

router.post("/", (req, res) => bookController.create(req, res));
router.get("/", (req, res) => bookController.findAll(req, res));

export default router;