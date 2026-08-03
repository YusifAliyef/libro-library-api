import { AppDataSource } from "../config/database";
import { Author } from "../entities/Author";
import { CreateAuthorDto } from "../dtos/CreateAuthorDto";
import { AuthorResponseDto } from "../dtos/AuthorResponseDto";
import { AppError } from "../errors/AppError";

export class AuthorService {
  private authorRepository = AppDataSource.getRepository(Author);

  async createAuthor(dto: CreateAuthorDto): Promise<AuthorResponseDto> {
    const author = new Author();
    author.name = dto.name;
    author.biography = dto.biography || "";

    const saved = await this.authorRepository.save(author);
    return AuthorResponseDto.fromEntity(saved);
  }

  async getFilteredAuthors(queryParams: {
    page?: number;
    limit?: number;
    name?: string;
    biography?: string;
  }) {
    const page = Number(queryParams.page) || 1;
    const limit = Number(queryParams.limit) || 10;
    const skip = (page - 1) * limit;

    const query = this.authorRepository.createQueryBuilder("author");

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

    return {
      data: authors.map(AuthorResponseDto.fromEntity),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getAuthorById(id: number): Promise<AuthorResponseDto> {
    const author = await this.authorRepository.findOneBy({ id });
    if (!author) {
      throw new AppError("Yazıçı tapılmadı!", 404);
    }
    return AuthorResponseDto.fromEntity(author);
  }

  async updateAuthor(
    id: number,
    dto: CreateAuthorDto
  ): Promise<AuthorResponseDto> {
    const author = await this.authorRepository.findOneBy({ id });
    if (!author) {
      throw new AppError("Yenilənmək istənən yazıçı tapılmadı!", 404);
    }

    author.name = dto.name;
    author.biography = dto.biography || "";

    const updated = await this.authorRepository.save(author);
    return AuthorResponseDto.fromEntity(updated);
  }

  async deleteAuthor(id: number): Promise<void> {
    const author = await this.authorRepository.findOneBy({ id });
    if (!author) {
      throw new AppError("Silinmək istənən yazıçı tapılmadı!", 404);
    }
    await this.authorRepository.remove(author);
  }
}