import { Author } from "../entities/Author";

export class AuthorResponseDto {
  id: number;
  name: string;
  biography: string | null;

  static fromEntity(entity: Author): AuthorResponseDto {
    const dto = new AuthorResponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.biography = entity.biography;
    return dto;
  }
}