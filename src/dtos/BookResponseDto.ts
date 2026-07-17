import { Book } from "../entities/Book";
import { AuthorResponseDto } from "./AuthorResponseDto";

export class BookResponseDto {
  id: number;
  title: string;
  isbn: string;
  author?: AuthorResponseDto;

  static fromEntity(entity: Book): BookResponseDto {
    const dto = new BookResponseDto();
    dto.id = entity.id;
    dto.title = entity.title;
    dto.isbn = entity.isbn;
    if (entity.author) {
      dto.author = AuthorResponseDto.fromEntity(entity.author);
    }
    return dto;
  }
}