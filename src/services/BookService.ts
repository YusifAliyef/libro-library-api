import { AppDataSource } from "../config/database";
import { Book } from "../entities/Book";
import { Author } from "../entities/Author";
import { CreateBookDto } from "../dtos/CreateBookDto";
import { BookResponseDto } from "../dtos/BookResponseDto";

export class BookService {
  private bookRepository = AppDataSource.getRepository(Book);
  private authorRepository = AppDataSource.getRepository(Author);

  async createBook(dto: CreateBookDto): Promise<BookResponseDto> {
    const author = await this.authorRepository.findOneBy({ id: dto.authorId });
    if (!author) {
      throw new Error("Göstərilən ID-li yazar tapılmadı!");
    }

    const book = new Book();
    book.title = dto.title;
    book.isbn = dto.isbn;
    book.author = author;

    const saved = await this.bookRepository.save(book);
    return BookResponseDto.fromEntity(saved);
  }

  async getAllBooks(): Promise<BookResponseDto[]> {
    const books = await this.bookRepository.find({
      relations: {
        author: true,
      },
    });
    return books.map(BookResponseDto.fromEntity);
  }
}
