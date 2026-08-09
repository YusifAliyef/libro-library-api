import path from "path";
import fs from "fs";
import { AppError } from "../errors/AppError";
import { FileResponseDto } from "../dtos/FileResponseDto";

export class FileService {
  async handleFileUpload(file?: Express.Multer.File): Promise<FileResponseDto> {
    if (!file) {
      throw new AppError("Fayl seçilməyib!", 400);
    }
    return FileResponseDto.fromFile(file);
  }

  async getFilePath(filename: string): Promise<string> {
    const filePath = path.join(__dirname, "../../uploads", filename);

    if (!fs.existsSync(filePath)) {
      throw new AppError("Fayl tapılmadı!", 404);
    }

    return filePath;
  }
}