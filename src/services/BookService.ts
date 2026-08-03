import { AppDataSource } from "../config/database";
import { Book } from "../entities/Book";
import { Author } from "../entities/Author";
import { Category } from "../entities/Category";
import { In } from "typeorm";
import { CreateBookDto } from "../dtos/CreateBookDto";
import { BookResponseDto } from "../dtos/BookResponseDto";
import { AppError } from "../errors/AppError";

export class BookService {
  private bookRepository = AppDataSource.getRepository(Book);
  private authorRepository = AppDataSource.getRepository(Author);
  private categoryRepository = AppDataSource.getRepository(Category);

  async createBook(dto: CreateBookDto): Promise<BookResponseDto> {
    const author = await this.authorRepository.findOneBy({ id: dto.authorId });
    if (!author) {
      throw new AppError("Göstərilən ID-li yazar tapılmadı!", 404);
    }

    const book = new Book();
    book.title = dto.title;
    book.isbn = dto.isbn;
    book.author = author;

    if (dto.categoryIds && dto.categoryIds.length > 0) {
      const categories = await this.categoryRepository.findBy({
        id: In(dto.categoryIds),
      });
      book.categories = categories;
    }

    const saved = await this.bookRepository.save(book);
    return BookResponseDto.fromEntity(saved);
  }

  async getAllBooks(queryParams: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
    title?: string;
    authorName?: string;
    categoryId?: number;
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

    const query = this.bookRepository
      .createQueryBuilder("book")
      .leftJoinAndSelect("book.author", "author")
      .leftJoinAndSelect("book.categories", "category");

    if (queryParams.title) {
      query.andWhere("LOWER(book.title) LIKE LOWER(:title)", {
        title: `%${queryParams.title}%`,
      });
    }

    if (queryParams.authorName) {
      query.andWhere("LOWER(author.name) LIKE LOWER(:authorName)", {
        authorName: `%${queryParams.authorName}%`,
      });
    }

    if (queryParams.categoryId) {
      query.andWhere("category.id = :categoryId", {
        categoryId: queryParams.categoryId,
      });
    }

    const [books, total] = await query
      .orderBy(`book.${sortBy}`, sortOrder)
      .skip(skip)
      .take(limit)
      .getManyAndCount();

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
      relations: { author: true, categories: true },
    });

    if (!book) {
      throw new AppError("Kitab tapılmadı!", 404);
    }
    return BookResponseDto.fromEntity(book);
  }

  async updateBook(id: number, dto: CreateBookDto): Promise<BookResponseDto> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: { author: true, categories: true },
    });

    if (!book) {
      throw new AppError("Yenilənmək istənən kitab tapılmadı!", 404);
    }

    if (dto.authorId && book.author.id !== dto.authorId) {
      const newAuthor = await this.authorRepository.findOneBy({
        id: dto.authorId,
      });
      if (!newAuthor) {
        throw new AppError("Göstərilən yeni ID-li yazar tapılmadı!", 404);
      }
      book.author = newAuthor;
    }

    if (dto.categoryIds) {
      const categories = await this.categoryRepository.findBy({
        id: In(dto.categoryIds),
      });
      book.categories = categories;
    }

    book.title = dto.title;
    book.isbn = dto.isbn;

    const updated = await this.bookRepository.save(book);
    return BookResponseDto.fromEntity(updated);
  }

  async deleteBook(id: number): Promise<void> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new AppError("Silinmək istənən kitab tapılmadı!", 404);
    }
    await this.bookRepository.remove(book);
  }
}