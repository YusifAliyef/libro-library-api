import { Router } from "express";
import { MemberController } from "../controllers/MemberController";

const router = Router();
const memberController = new MemberController();

router.post("/", (req, res) => memberController.create(req, res));
router.get("/", (req, res) => memberController.findAll(req, res));

export default router;
