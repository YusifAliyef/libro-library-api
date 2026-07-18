import { Router } from "express";
import { MemberController } from "../controllers/MemberController";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { CreateMemberDto } from "../dtos/CreateMemberDto";

const router = Router();
const memberController = new MemberController();

router.post("/", validationMiddleware(CreateMemberDto), memberController.create);
router.put("/:id", validationMiddleware(CreateMemberDto), memberController.update);

router.get("/", memberController.findAll);
router.get("/:id", memberController.findOne);
router.delete("/:id", memberController.delete);

export default router;