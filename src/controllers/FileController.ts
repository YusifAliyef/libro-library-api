import { Request, Response, NextFunction } from "express";
import { FileService } from "../services/FileService";

export class FileController {
  private fileService = new FileService();

  uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.fileService.handleFileUpload(req.file);
      return res.status(201).json({
        message: "Fayl uğurla yükləndi",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  downloadFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filename = req.params.filename as string;
      const filePath = await this.fileService.getFilePath(filename);
      return res.download(filePath);
    } catch (error) {
      next(error);
    }
  };
}
