import { AppDataSource } from "../config/database";
import { Author } from "../entities/Author";
import { CreateAuthorDto } from "../dtos/CreateAuthorDto";
import { AuthorResponseDto } from "../dtos/AuthorResponseDto";
import { AppError } from "../errors/AppError";
import { CacheService } from "../utils/cacheService";

export class AuthorService {
  private authorRepository = AppDataSource.getRepository(Author);

  async createAuthor(dto: CreateAuthorDto): Promise<AuthorResponseDto> {
    const author = new Author();
    author.name = dto.name;
    author.biography = dto.biography || "";

    const saved = await this.authorRepository.save(author);

    CacheService.invalidatePattern("authors");

    return AuthorResponseDto.fromEntity(saved);
  }

  async getFilteredAuthors(queryParams: {
    page?: number;
    limit?: number;
    name?: string;
    biography?: string;
  }) {
    const cacheKey = `authors_${JSON.stringify(queryParams)}`;
    const cachedData = CacheService.get<any>(cacheKey);

    if (cachedData) {
      console.log("[CACHE HIT] Müəlliflər keşdən gətirildi.");
      return cachedData;
    }

    const page = Number(queryParams.page) || 1;
    const limit = Number(queryParams.limit) || 10;
    const skip = (page - 1) * limit;

    const query = this.authorRepository
      .createQueryBuilder("author")
      .leftJoinAndSelect("author.books", "books");

    if (queryParams.name) {
      query.andWhere("LOWER(author.name) LIKE LOWER(:name)", {
        name: `%${queryParams.name}%`,
      });
    }

    if (queryParams.biography) {
      query.andWhere("LOWER(author.biography) LIKE LOWER(:biography)", {
        biography: `%${queryParams.biography}%`,
      });
    }

    const [authors, total] = await query
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const result = {
      data: authors.map(AuthorResponseDto.fromEntity),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };

    CacheService.set(cacheKey, result, 300);

    return result;
  }

  async getAuthorById(id: number): Promise<AuthorResponseDto> {
    const cacheKey = `authors_id_${id}`;
    const cachedData = CacheService.get<AuthorResponseDto>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const author = await this.authorRepository.findOneBy({ id });
    if (!author) {
      throw new AppError("Yazıçı tapılmadı!", 404);
    }

    const result = AuthorResponseDto.fromEntity(author);
    CacheService.set(cacheKey, result, 300);

    return result;
  }

  async getAllAuthorsWithBooks(): Promise<AuthorResponseDto[]> {
    const cacheKey = "authors_all_books";
    const cachedData = CacheService.get<AuthorResponseDto[]>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const authors = await AppDataSource.getRepository(Author)
      .createQueryBuilder("author")
      .leftJoinAndSelect("author.books", "books")
      .getMany();

    const result = authors.map((author) =>
      AuthorResponseDto.fromEntity(author),
    );
    CacheService.set(cacheKey, result, 300);

    return result;
  }

  async updateAuthor(
    id: number,
    dto: CreateAuthorDto,
  ): Promise<AuthorResponseDto> {
    const author = await this.authorRepository.findOneBy({ id });
    if (!author) {
      throw new AppError("Yenilənmək istənən yazıçı tapılmadı!", 404);
    }

    author.name = dto.name;
    author.biography = dto.biography || "";

    const updated = await this.authorRepository.save(author);

    CacheService.invalidatePattern("authors");

    return AuthorResponseDto.fromEntity(updated);
  }

  async deleteAuthor(id: number): Promise<void> {
    const author = await this.authorRepository.findOneBy({ id });
    if (!author) {
      throw new AppError("Silinmək istənən yazıçı tapılmadı!", 404);
    }

    await this.authorRepository.remove(author);

    CacheService.invalidatePattern("authors");
  }
}
