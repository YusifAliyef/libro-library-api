import { BookService } from "../services/BookService";
import { AppDataSource } from "../config/database";
import { Book } from "../entities/Book";

describe("Transaction Rollback Tests", () => {
  let bookService: BookService;

  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    bookService = new BookService();
  });

  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  it("müəllif tapılmadıqda tranzaksiya rollback olunmalı və kitab bazaya yazılmamalıdır", async () => {
    const invalidDto = {
      title: "Rollback Test Kitabı",
      isbn: "9999999999999",
      authorId: 99999,
      categoryIds: [1],
    };

    await expect(
      bookService.createBookWithTransaction(invalidDto),
    ).rejects.toThrow();

    const bookInDb = await AppDataSource.getRepository(Book).findOneBy({
      isbn: invalidDto.isbn,
    });

    expect(bookInDb).toBeNull();
  });
});
