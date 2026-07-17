import { Router } from "express";
import { MemberController } from "../controllers/MemberController";

const router = Router();
const memberController = new MemberController();

router.post("/", memberController.create);
router.get("/", memberController.findAll);
router.get("/:id", memberController.findOne);
router.put("/:id", memberController.update);
router.delete("/:id", memberController.delete);

export default router;
