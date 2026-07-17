import { AppDataSource } from "../config/database";
import { Author } from "../entities/Author";
import { CreateAuthorDto } from "../dtos/CreateAuthorDto";
import { AuthorResponseDto } from "../dtos/AuthorResponseDto";

export class AuthorService {
  private authorRepository = AppDataSource.getRepository(Author);

  async createAuthor(dto: CreateAuthorDto): Promise<AuthorResponseDto> {
    const author = new Author();
    author.name = dto.name;
    author.biography = dto.biography || "";

    const saved = await this.authorRepository.save(author);
    return AuthorResponseDto.fromEntity(saved);
  }

  async getAllAuthors(): Promise<AuthorResponseDto[]> {
    const authors = await this.authorRepository.find();
    return authors.map(AuthorResponseDto.fromEntity);
  }

  async getAuthorById(id: number): Promise<AuthorResponseDto> {
    const author = await this.authorRepository.findOneBy({ id });
    if (!author) {
      throw new Error("Yazıçı tapılmadı!");
    }
    return AuthorResponseDto.fromEntity(author);
  }

  async updateAuthor(
    id: number,
    dto: CreateAuthorDto,
  ): Promise<AuthorResponseDto> {
    const author = await this.authorRepository.findOneBy({ id });
    if (!author) {
      throw new Error("Yenilənmək istənən yazıçı tapılmadı!");
    }

    author.name = dto.name;
    author.biography = dto.biography || "";

    const updated = await this.authorRepository.save(author);
    return AuthorResponseDto.fromEntity(updated);
  }

  async deleteAuthor(id: number): Promise<void> {
    const author = await this.authorRepository.findOneBy({ id });
    if (!author) {
      throw new Error("Silinmək istənən yazıçı tapılmadı!");
    }
    await this.authorRepository.remove(author);
  }
}
