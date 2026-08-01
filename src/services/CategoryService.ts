import { AppDataSource } from "../config/database";
import { Category } from "../entities/Category";
import { CreateCategoryDto } from "../dtos/CreateCategoryDto";
import { CategoryResponseDto } from "../dtos/CategoryResponseDto";

export class CategoryService {
  private categoryRepository = AppDataSource.getRepository(Category);

  async createCategory(dto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const category = new Category();
    category.name = dto.name;

    const saved = await this.categoryRepository.save(category);
    return CategoryResponseDto.fromEntity(saved);
  }

  async getAllCategories(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryRepository.find();
    return categories.map(CategoryResponseDto.fromEntity);
  }

  async getCategoryById(id: number): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new Error("Kateqoriya tapılmadı!");
    }
    return CategoryResponseDto.fromEntity(category);
  }

  async updateCategory(
    id: number,
    dto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new Error("Yenilənmək istənən kateqoriya tapılmadı!");
    }

    category.name = dto.name;

    const updated = await this.categoryRepository.save(category);
    return CategoryResponseDto.fromEntity(updated);
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new Error("Silinmək istənən kateqoriya tapılmadı!");
    }
    await this.categoryRepository.remove(category);
  }
}