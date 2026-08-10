import { AppDataSource } from "../config/database";
import { Category } from "../entities/Category";
import { CreateCategoryDto } from "../dtos/CreateCategoryDto";
import { CategoryResponseDto } from "../dtos/CategoryResponseDto";
import { AppError } from "../errors/AppError";
import { CacheService } from "../utils/cacheService";

export class CategoryService {
  private categoryRepository = AppDataSource.getRepository(Category);

  async createCategory(dto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const category = new Category();
    category.name = dto.name;

    const saved = await this.categoryRepository.save(category);

    CacheService.invalidatePattern("categories");

    return CategoryResponseDto.fromEntity(saved);
  }

  async getAllCategories(): Promise<CategoryResponseDto[]> {
    const cacheKey = "categories_all";
    const cachedData = CacheService.get<CategoryResponseDto[]>(cacheKey);

    if (cachedData) {
      console.log("[CACHE HIT] Kateqoriyalar keşdən gətirildi.");
      return cachedData;
    }

    const categories = await AppDataSource.getRepository(Category).find();
    const result = categories.map((cat) => CategoryResponseDto.fromEntity(cat));

    CacheService.set(cacheKey, result, 300);

    return result;
  }

  async getCategoryById(id: number): Promise<CategoryResponseDto> {
    const cacheKey = `categories_id_${id}`;
    const cachedData = CacheService.get<CategoryResponseDto>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new AppError("Kateqoriya tapılmadı!", 404);
    }

    const result = CategoryResponseDto.fromEntity(category);
    CacheService.set(cacheKey, result, 300);

    return result;
  }

  async updateCategory(
    id: number,
    dto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new AppError("Yenilənmək istənən kateqoriya tapılmadı!", 404);
    }

    category.name = dto.name;

    const updated = await this.categoryRepository.save(category);

    CacheService.invalidatePattern("categories");

    return CategoryResponseDto.fromEntity(updated);
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new AppError("Silinmək istənən kateqoriya tapılmadı!", 404);
    }

    await this.categoryRepository.remove(category);

    CacheService.invalidatePattern("categories");
  }
}
