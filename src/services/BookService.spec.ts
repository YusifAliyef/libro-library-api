import { BookService } from "./BookService";
import { AppDataSource } from "../config/database";

const mockBookRepository = {
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  findAndCount: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};

jest.mock("../config/database", () => ({
  AppDataSource: {
    getRepository: jest.fn(() => mockBookRepository),
  },
}));

describe("BookService Unit Tests", () => {
  let bookService: BookService;

  beforeEach(() => {
    bookService = new BookService();
    jest.clearAllMocks();
  });

  it("should return a book if it exists", async () => {
    const mockBook = {
      id: 1,
      title: "Test Kitabı",
      isbn: "978-9952-123-45-6",
      author: { id: 1, name: "Test Müəllif" },
    };

    mockBookRepository.findOne.mockResolvedValue(mockBook);

    const result = await bookService.getBookById(1);

    expect(result).toBeDefined();
    expect(result.title).toBe("Test Kitabı");
    expect(mockBookRepository.findOne).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if the book does not exist", async () => {
    mockBookRepository.findOne.mockResolvedValue(null);

    await expect(bookService.getBookById(999)).rejects.toThrow("Kitab tapılmadı!");
  });
});