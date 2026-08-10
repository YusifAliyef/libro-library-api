import { Router } from "express";
import { NotificationController } from "../controllers/NotificationController";

const router = Router();
const controller = new NotificationController();

router.post("/send-email", controller.sendEmailNotification);

export default router;