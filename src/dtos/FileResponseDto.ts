export class FileResponseDto {
  filename!: string;
  originalname!: string;
  mimetype!: string;
  size!: number;
  path!: string;

  static fromFile(file: Express.Multer.File): FileResponseDto {
    const dto = new FileResponseDto();
    dto.filename = file.filename;
    dto.originalname = file.originalname;
    dto.mimetype = file.mimetype;
    dto.size = file.size;
    dto.path = file.path;
    return dto;
  }
}