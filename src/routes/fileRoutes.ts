import { Router } from "express";
import { FileController } from "../controllers/FileController";
import { upload } from "../config/upload";

const router = Router();
const fileController = new FileController();

router.post("/upload", upload.single("file"), fileController.uploadFile);
router.get("/download/:filename", fileController.downloadFile);

export default router;