import { Author } from "../entities/Author";

export class AuthorResponseDto {
  id: number;
  name: string;
  biography: string | null;
  books?: { id: number; title: string; isbn: string }[];

  static fromEntity(entity: Author): AuthorResponseDto {
    const dto = new AuthorResponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.biography = entity.biography;

    if (entity.books) {
      dto.books = entity.books.map((book) => ({
        id: book.id,
        title: book.title,
        isbn: book.isbn,
      }));
    }

    return dto;
  }
}