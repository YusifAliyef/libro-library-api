import { Category } from "../entities/Category";

export class CategoryResponseDto {
  id: number;
  name: string;

  static fromEntity(entity: Category): CategoryResponseDto {
    const dto = new CategoryResponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    return dto;
  }
}
