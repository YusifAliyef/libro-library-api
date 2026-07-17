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

  async getBookById(id: number): Promise<BookResponseDto> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new Error("Kitab tapılmadı!");
    }
    return BookResponseDto.fromEntity(book);
  }

  async updateBook(id: number, dto: CreateBookDto): Promise<BookResponseDto> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new Error("Yenilənmək istənən kitab tapılmadı!");
    }
    book.title = dto.title;
    book.isbn = dto.isbn;

    const updated = await this.bookRepository.save(book);
    return BookResponseDto.fromEntity(updated);
  }

  async deleteBook(id: number): Promise<void> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new Error("Yenilənmək istənən kitab tapılmadı!");
    }
    await this.bookRepository.remove(book);
  }
}
