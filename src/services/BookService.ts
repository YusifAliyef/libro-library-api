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

  async getAllBooks(queryParams: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
  }): Promise<{
    data: BookResponseDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    const page = Number(queryParams.page) || 1;
    const limit = Number(queryParams.limit) || 10;
    const sortBy = queryParams.sortBy || "id";
    const sortOrder = queryParams.sortOrder === "DESC" ? "DESC" : "ASC";

    const skip = (page - 1) * limit;

    const [books, total] = await this.bookRepository.findAndCount({
      relations: {
        author: true,
      },
      order: {
        [sortBy]: sortOrder,
      },
      take: limit,
      skip: skip,
    });

    const mappedData = books.map((book) => BookResponseDto.fromEntity(book));

    return {
      data: mappedData,
      total,
      page,
      limit,
    };
  }

  async getBookById(id: number): Promise<BookResponseDto> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: { author: true },
    });

    if (!book) {
      throw new Error("Kitab tapılmadı!");
    }
    return BookResponseDto.fromEntity(book);
  }

  async updateBook(id: number, dto: CreateBookDto): Promise<BookResponseDto> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: { author: true },
    });

    if (!book) {
      throw new Error("Yenilənmək istənən kitab tapılmadı!");
    }

    if (dto.authorId && book.author.id !== dto.authorId) {
      const newAuthor = await this.authorRepository.findOneBy({
        id: dto.authorId,
      });
      if (!newAuthor) {
        throw new Error("Göstərilən yeni ID-li yazar tapılmadı!");
      }
      book.author = newAuthor;
    }

    book.title = dto.title;
    book.isbn = dto.isbn;

    const updated = await this.bookRepository.save(book);
    return BookResponseDto.fromEntity(updated);
  }

  async deleteBook(id: number): Promise<void> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new Error("Silinmək istənən kitab tapılmadı!");
    }
    await this.bookRepository.remove(book);
  }
}
