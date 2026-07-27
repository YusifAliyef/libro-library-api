import { Request, Response, NextFunction } from "express";
import { BookService } from "../services/BookService";

export class BookController {
  private bookService = new BookService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.bookService.createBook(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit, sortBy, sortOrder } = req.query;

      const result = await this.bookService.getAllBooks({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        sortBy: sortBy as string,
        sortOrder: sortOrder as "ASC" | "DESC",
      });

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await this.bookService.getBookById(id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await this.bookService.updateBook(id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.bookService.deleteBook(id);
      return res.status(200).send({ message: "Kitab uğurla silindi" });
    } catch (error) {
      next(error);
    }
  };
}